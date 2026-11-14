import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.schema';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.categoriesService.create(dto);
  }

  @Get()
  async findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.categoriesService.findAll();
  }

  @Get('tree')
  async findTree() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.categoriesService.findTree();
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.categoriesService.findBySlug(slug);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.categoriesService.remove(id);
  }
}
