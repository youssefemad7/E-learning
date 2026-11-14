import mongoose, { HydratedDocument, Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './course.schema';
import { Category } from '../categories/category.schema';
import { CreateCourseDto } from './create-course.dto';
import { CourseStatus } from './course.schema';
import { UserRole } from '../users/user.schema';
import { UpdateCourseDto } from './update-course.dto';
@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  // Create a new course:
  // - Validate that the category exists.
  // - Generate a unique slug from the course title.
  // - Set the instructor ID from the authenticated user.
  // - Set the initial status to DRAFT.
  // - Save and return the created course.
  async create(
    instructorId: string,
    createCourseDto: CreateCourseDto,
  ): Promise<any> {
    const { category, title } = createCourseDto;
    const normalizedTitle = title.toLowerCase().trim();

    // 1- Check if Category exists
    const existCategory = await this.categoryModel.findById(category);
    if (!existCategory) {
      throw new NotFoundException(
        'Category not found,Course must has category',
      );
    }
    // 2-Check if Course title is exist
    const existTitle = await this.courseModel.findOne({
      normalizedTitle: normalizedTitle,
      instructor: instructorId,
    });
    if (existTitle) {
      throw new ConflictException(
        'A course with this title already exists under this instructor',
      );
    }
    // 3-Create Slug from title
    const baseSlug = normalizedTitle
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-|-$/g, '');
    if (!baseSlug) {
      throw new BadRequestException(
        'Course title must contain at least one letter or number',
      );
    }
    // 4- Ensure slug is globally unique
    let slug = baseSlug;
    let counter = 1;
    while (await this.courseModel.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    // 5-Create the Course
    const createdCourse = new this.courseModel({
      ...createCourseDto,
      title: title,
      normalizedTitle: normalizedTitle,
      slug,
      instructor: instructorId,
      status: CourseStatus.DRAFT,
      rejectionReason: null,
    });
    try {
      const savedCourse = await createdCourse.save();
      const result = savedCourse.toObject();
      return result;
    } catch (error) {
      if ((error as { code?: number })?.code === 11000) {
        throw new ConflictException(
          'A course with this title or slug already exists',
        );
      }
      throw error;
    }
  }

  // Retrieve all courses:
  // - Support pagination and sorting.
  // - Support filtering by category, level, and status.
  // - Students/Public: return PUBLISHED courses only.
  // - Instructors: return their own courses.
  // - Admin: can retrieve all courses.
  async findAll(
    pageNumber: number,
    coursePerPage: number,
    category: string,
    level: string,
    status: string,
    user: { userId: string; role: UserRole },
  ): Promise<any> {
    const filters: any = {};
    if (pageNumber < 1) {
      throw new BadRequestException('Page number must be at least 1');
    }

    if (coursePerPage < 1 || coursePerPage > 50) {
      throw new BadRequestException(
        'Courses per page must be between 1 and 50',
      );
    }
    // 1. Add optional filters
    if (category) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      filters.category = category;
    }

    if (level) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      filters.level = level;
    }

    // 2. Apply role-based filtering
    if (user.role === UserRole.ADMIN) {
      if (status) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        filters.status = status;
      }
    } else if (user.role === UserRole.INSTRUCTOR) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      filters.instructor = user.userId;

      if (status) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        filters.status = status;
      }
    } else if (user.role === UserRole.STUDENT) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      filters.status = CourseStatus.PUBLISHED;
    } else {
      throw new ForbiddenException('You are not allowed to view courses');
    }

    // 3. Pagination and sorting
    return (
      this.courseModel
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .find(filters)
        .skip(coursePerPage * (pageNumber - 1))
        .limit(coursePerPage)
        .sort({ title: 1 })
        .exec()
    );
  }

  // Retrieve a single course by ID:
  // - Validate the course ID.
  // - Check whether the course exists.
  // - Apply visibility and access rules based on the user's role.
  // - Return the course.
  async findOne(
    id: string,
    user: { userId: string; role: UserRole },
  ): Promise<any> {
    if (!id) {
      throw new BadRequestException('Course ID is missing');
    }

    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (user.role === UserRole.ADMIN) {
      return course;
    } else if (user.role === UserRole.INSTRUCTOR) {
      if (course.instructor.toString() === user.userId) {
        return course;
      }
    } else if (user.role === UserRole.STUDENT) {
      if (course.status === CourseStatus.PUBLISHED) {
        return course;
      }
    }

    throw new ForbiddenException('You are not allowed to view this course');
  }

  // Retrieve a course by its slug:
  // - Validate that the slug is provided.
  // - Check whether the course exists.
  // - Apply visibility and access rules based on the user's role.
  // - Return the course.
  async findBySlug(
    slug: string,
    user: { userId: string; role: UserRole },
  ): Promise<any> {
    if (!slug) {
      throw new BadRequestException('Slug is missing');
    }
    const course = await this.courseModel.findOne({ slug });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (user.role === UserRole.ADMIN) {
      return course;
    } else if (user.role === UserRole.INSTRUCTOR) {
      if (course.instructor.toString() === user.userId) {
        return course;
      }
    } else if (user.role === UserRole.STUDENT) {
      if (course.status === CourseStatus.PUBLISHED) {
        return course;
      }
    }

    throw new ForbiddenException('You are not allowed to view this course');
  }

  // Update an existing course:
  // - Check whether the course exists.
  // - Verify that the user owns the course or is an Admin.
  // - Validate the new category if it was changed.
  // - Generate a new unique slug if the title was changed.
  // - Update only the fields allowed by the current user and course status.
  // - If a PUBLISHED course is edited, move it back to PENDING_REVIEW.

  async update(
    id: string,
    user: { userId: string; role: UserRole },
    updateCourseDto: UpdateCourseDto,
  ): Promise<any> {
    const {
      title,
      description,
      thumbnail,
      price,
      level,
      requirements,
      learningOutcomes,
      category,
    } = updateCourseDto;

    // 1- Validate the course ID
    if (!id) {
      throw new BadRequestException('Course ID is missing');
    }

    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 2- Check if the user is the owner of the course or an Admin
    if (
      user.role !== UserRole.ADMIN &&
      user.userId !== course.instructor.toString()
    ) {
      throw new ForbiddenException('You are not allowed to update this course');
    }

    // 3- Validate the new category if it was changed
    if (category !== undefined && category !== course.category.toString()) {
      if (!mongoose.isValidObjectId(category)) {
        throw new BadRequestException('Invalid Category ID');
      }

      const existCategory = await this.categoryModel.findById(category);

      if (!existCategory) {
        throw new NotFoundException('Category not found');
      }

      course.category = new mongoose.Types.ObjectId(category);
    }

    // 4- Update title and generate a new unique slug if needed
    if (title !== undefined) {
      const normalizedTitle = title.toLowerCase().trim();

      if (normalizedTitle !== course.normalizedTitle) {
        // Check if the title already exists under the course owner
        const existTitle = await this.courseModel.findOne({
          _id: { $ne: course._id },
          normalizedTitle,
          instructor: course.instructor,
        });

        if (existTitle) {
          throw new ConflictException(
            'A course with this title already exists under this instructor',
          );
        }

        // Create slug from title
        const baseSlug = normalizedTitle
          .replace(/[^\p{L}\p{N}]+/gu, '-')
          .replace(/^-|-$/g, '');

        if (!baseSlug) {
          throw new BadRequestException(
            'Course title must contain at least one letter or number',
          );
        }

        // Ensure slug is globally unique, excluding the current course
        let slug = baseSlug;
        let counter = 1;

        while (
          await this.courseModel.exists({
            slug,
            _id: { $ne: course._id },
          })
        ) {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }

        course.normalizedTitle = normalizedTitle;
        course.slug = slug;
      }

      course.title = title;
    }

    // 5- Update the remaining fields
    if (description !== undefined) {
      course.description = description;
    }

    if (thumbnail !== undefined) {
      course.thumbnail = thumbnail;
    }

    if (price !== undefined) {
      course.price = price;
    }

    if (level !== undefined) {
      course.level = level;
    }

    if (requirements !== undefined) {
      course.requirements = requirements;
    }

    if (learningOutcomes !== undefined) {
      course.learningOutcomes = learningOutcomes;
    }

    // 6- Move published courses back to review only if content changed
    if (course.status === CourseStatus.PUBLISHED && course.isModified()) {
      course.status = CourseStatus.PENDING_REVIEW;
    }

    // 7- Save the updated course
    try {
      return await course.save();
    } catch (error) {
      if ((error as { code?: number })?.code === 11000) {
        throw new ConflictException(
          'A course with this title or slug already exists',
        );
      }

      throw error;
    }
  }

  // Delete a course:
  // - Check whether the course exists.
  // - Prevent deletion if the course has related enrollments.
  // - Verify that the user is the owner or an Admin.
  // - Delete the course according to the project's deletion policy.
  async remove(
    id: string,
    user: { userId: string; role: UserRole },
  ): Promise<any> {
    // Validate the course ID
    if (!id) {
      throw new BadRequestException('Course ID is missing');
    }
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid Course ID');
    }
    const course = await this.courseModel.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }
    // Check if the course has related enrollments (this part is not implemented in the provided code)
    // Check if the user is the owner of the course or an Admin
    if (
      course.instructor.toString() === user.userId ||
      user.role === UserRole.ADMIN
    ) {
      return this.courseModel.findByIdAndDelete(id);
    }

    throw new ForbiddenException('You are not allowed to delete this course');
  }

  // Verify course ownership:
  // - Check whether the authenticated user owns the course.
  // - Allow Admin access regardless of ownership.
  // - Throw an appropriate exception if access is denied.
  async checkOwnership(
    id: string,
    user: { userId: string; role: UserRole },
  ): Promise<HydratedDocument<Course>> {
    // 1-Check whether the course exists.
    if (!id) {
      throw new BadRequestException('Course ID is missing');
    }

    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }
    // 2- Allow Admin access regardless of ownership.
    if (
      user.role !== UserRole.ADMIN &&
      user.userId !== course.instructor.toString()
    ) {
      throw new ForbiddenException('You are not allowed to access this course');
    }
    return course;
  }
  // Submit a course for review:
  // - Check whether the course exists.
  // - Verify that the user owns the course.
  // - Allow submission only from DRAFT or REJECTED status.
  // - Ensure that all required course information is complete.
  // - Change status to PENDING_REVIEW.

  async submitForReview(
    id: string,
    user: { userId: string; role: UserRole },
  ): Promise<any> {
    // 1- Only the course owner (Instructor) can submit for review
    if (user.role !== UserRole.INSTRUCTOR) {
      throw new ForbiddenException(
        'Only the course owner can submit a course for review',
      );
    }

    // 2- Check course existence and ownership
    const course = await this.checkOwnership(id, user);

    // 3- Validate course status
    if (
      course.status !== CourseStatus.DRAFT &&
      course.status !== CourseStatus.REJECTED
    ) {
      throw new BadRequestException('Course status must be DRAFT or REJECTED');
    }

    // 4- Ensure all required course information is complete
    if (
      !course.title?.trim() ||
      !course.description?.trim() ||
      !course.thumbnail ||
      !course.category ||
      course.price === undefined ||
      course.price === null ||
      !course.level ||
      !course.requirements?.length ||
      !course.learningOutcomes?.length
    ) {
      throw new BadRequestException(
        'Course information is incomplete. Please complete all required fields',
      );
    }

    // 5- Change status and clear previous rejection reason
    course.status = CourseStatus.PENDING_REVIEW;
    course.rejectionReason = null;

    // 6- Save and return the updated course
    return await course.save();
  }

  // Approve a course:
  // - Admin only.
  // - Check whether the course exists.
  // - Allow approval only from PENDING_REVIEW status.
  // - Change status to PUBLISHED.
  // - Clear the rejection reason.

  async approve(
    id: string,
    user: { userId: string; role: UserRole },
  ): Promise<any> {
    // 1- Only Admin can approve a course
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only Admin can approve a course');
    }

    // 2- Validate course ID
    if (!id) {
      throw new BadRequestException('Course ID is missing');
    }

    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid Course ID');
    }

    // 3- Check course existence
    const course = await this.courseModel.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 4- Validate course status
    if (course.status !== CourseStatus.PENDING_REVIEW) {
      throw new BadRequestException('Course status must be PENDING_REVIEW');
    }

    // 5- Approve course and clear rejection reason
    course.status = CourseStatus.PUBLISHED;
    course.rejectionReason = null;

    // 6- Save and return
    return await course.save();
  }

  // Reject a course:
  // - Admin only.
  // - Check whether the course exists.
  // - Allow rejection only from PENDING_REVIEW status.
  // - Require a rejection reason.
  // - Change status to REJECTED.
  // - Save the rejection reason.
  async reject(
    id: string,
    user: { userId: string; role: UserRole },
    reason: string,
  ): Promise<any> {
    // 1- Only Admin can reject a course
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only Admin can reject a course');
    }
    if (typeof reason !== 'string' || !reason.trim()) {
      throw new BadRequestException('Rejection reason is required');
    }

    if (reason.trim().length > 500) {
      throw new BadRequestException(
        'Rejection reason must not exceed 500 characters',
      );
    }

    // 2- Validate course ID
    if (!id) {
      throw new BadRequestException('Course ID is missing');
    }

    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid Course ID');
    }

    // 3- Check course existence
    const course = await this.courseModel.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 4- Validate course status
    if (course.status !== CourseStatus.PENDING_REVIEW) {
      throw new BadRequestException('Course status must be PENDING_REVIEW');
    }

    // 5- Reject course and save rejection reason
    course.rejectionReason = reason.trim();
    course.status = CourseStatus.REJECTED;

    // 6- Save and return
    return await course.save();
  }

  // Unpublish a course:
  // - Check whether the course exists.
  // - Verify that the user is the owner or an Admin.
  // - Allow unpublishing only from PUBLISHED status.
  // - Change status to UNPUBLISHED.
  async unpublish(
    id: string,
    user: { userId: string; role: UserRole },
  ): Promise<any> {
    //  Check whether the course exists.
    //  Verify that the user is the owner or an Admin.
    const course = await this.checkOwnership(id, user);
    //  Allow unpublishing only from PUBLISHED status.
    if (course.status !== CourseStatus.PUBLISHED) {
      throw new BadRequestException('Status must be only PUBLISHED');
    }
    //  Change status to UNPUBLISHED.
    course.status = CourseStatus.UNPUBLISHED;
    return await course.save();
  }
}
