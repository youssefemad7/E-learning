/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose, { Model, Types } from 'mongoose';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';
import { Course } from '../courses/course.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
    const { name, parentCategory } = createCategoryDto;
    if (typeof name !== 'string' || !name.trim()) {
      throw new BadRequestException('Category name is required');
    }
    const normalizedName = name.trim().toLowerCase();
    // 1- Check if parentCategory exists
    if (parentCategory) {
      const existParent = await this.categoryModel.findById(parentCategory);

      if (!existParent) {
        throw new NotFoundException('Parent category not found');
      }
    }
    // 2-Check if Category name is exist
    const existingName = await this.categoryModel.findOne({
      normalizedName,
      parentCategory: parentCategory ?? null,
    });
    if (existingName) {
      throw new ConflictException(
        'A category with this name already exists under this parent',
      );
    }
    // 3-Create Slug from name
    const baseSlug = normalizedName
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-|-$/g, '');
    if (!baseSlug) {
      throw new BadRequestException(
        'Category name must contain at least one letter or number',
      );
    }

    // 4- Ensure slug is globally unique
    let slug = baseSlug;
    let counter = 1;

    while (await this.categoryModel.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    // 5-Create the Category
    const createdCategory = new this.categoryModel({
      ...createCategoryDto,
      name: name,
      normalizedName,
      slug,
    });
    try {
      const savedCategory = await createdCategory.save();
      const result = savedCategory.toObject();
      return result;
    } catch (error) {
      if ((error as { code?: number })?.code === 11000) {
        throw new ConflictException(
          'A category with this name or slug already exists',
        );
      }
      throw error;
    }
  }
  async findAll(): Promise<any> {
    return await this.categoryModel.find({}).sort({ name: 1 });
  }

  async findTree(): Promise<any> {
    const categories = await this.categoryModel.find({}).sort({ name: 1 });

    const categoryMap = new Map<
      string,
      { _id: any; name: string | undefined; children: any[] }
    >();
    const result: Array<{
      _id: any;
      name: string | undefined;
      children: any[];
    }> = [];
    // 1. Create a node for every category
    for (const category of categories) {
      categoryMap.set(category._id.toString(), {
        _id: category._id,
        name: category.name,
        children: [],
      });
    }

    // 2. Connect each category to its parent
    for (const category of categories) {
      const currentCategory = categoryMap.get(category._id.toString());
      if (!currentCategory) continue;
      if (category.parentCategory == null) {
        result.push(currentCategory);
      } else {
        const parent = categoryMap.get(category.parentCategory.toString());

        if (parent) {
          parent.children.push(currentCategory);
        }
      }
    }

    return result;
  }
  async findOne(id: string): Promise<CategoryDocument> {
    if (!id) {
      throw new BadRequestException('Category ID is missing');
    }
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid Category ID');
    }
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
  async findBySlug(slug: string): Promise<any> {
    if (!slug) {
      throw new BadRequestException('Slug is missing');
    }

    const category = await this.categoryModel.findOne({ slug });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    const category = await this.findOne(id);

    const { name, description, image, parentCategory } = updateCategoryDto;

    // 1- Determine the effective parent
    const effectiveParentId =
      parentCategory !== undefined
        ? parentCategory
        : (category.parentCategory?.toString() ?? null);

    // 2- Validate parent and prevent circular hierarchy
    if (parentCategory !== undefined && parentCategory !== null) {
      let currentParentId: string | null = parentCategory;

      while (currentParentId) {
        if (currentParentId === category._id.toString()) {
          throw new BadRequestException(
            'A category cannot be its own parent or descendant parent',
          );
        }

        const currentParent =
          await this.categoryModel.findById(currentParentId);

        if (!currentParent) {
          throw new NotFoundException('Parent category not found');
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        currentParentId = currentParent.parentCategory?.toString() ?? null;
      }
    }

    // 3- Normalize name
    const normalizedName: string | undefined =
      name !== undefined ? name.trim() : category.name;

    // 4- Check duplicate name
    if (name !== undefined || parentCategory !== undefined) {
      const existingName = await this.categoryModel.findOne({
        _id: { $ne: category._id },
        name: normalizedName,
        parentCategory: effectiveParentId
          ? new Types.ObjectId(effectiveParentId)
          : null,
      });

      if (existingName) {
        throw new ConflictException(
          'A category with this name already exists under this parent',
        );
      }
    }

    // 5- Generate slug if name changed
    if (name !== undefined && normalizedName !== category.name) {
      const baseSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-|-$/g, '');

      if (!baseSlug) {
        throw new BadRequestException(
          'Category name must contain at least one letter or number',
        );
      }

      let slug = baseSlug;
      let counter = 1;

      while (
        await this.categoryModel.exists({
          slug,
          _id: { $ne: category._id },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      category.slug = slug;
    }

    // 6- Update only provided fields
    if (name !== undefined) {
      category.name = normalizedName;
    }

    if (description !== undefined) {
      category.description = description;
    }

    if (image !== undefined) {
      category.image = image || category.image;
    }

    if (parentCategory !== undefined) {
      category.parentCategory =
        parentCategory === null ? null : new Types.ObjectId(parentCategory);
    }

    // 7- Save changes
    try {
      return await category.save();
    } catch (error) {
      if ((error as { code?: number })?.code === 11000) {
        throw new ConflictException('Category already exists');
      }

      throw error;
    }
  }
  async remove(id: string): Promise<any> {
    //1-Check if there is a category
    await this.findOne(id);

    //2-check there is no courses related
    const course = await this.courseModel.exists({ category: id });
    if (course) {
      throw new ConflictException('Category has related courses');
    }
    //3-check there is no subcategory
    const subCategory = await this.categoryModel.exists({ parentCategory: id });
    if (subCategory) {
      throw new ConflictException('Category has related subcategories');
    }
    //4-Delete the category
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
