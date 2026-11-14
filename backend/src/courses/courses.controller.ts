import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  DefaultValuePipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './create-course.dto';
import { UserRole } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateCourseDto } from './update-course.dto';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Post()
  create(
    @Body() createCourseDto: CreateCourseDto,
    @Req() req: { user: { userId: string } },
  ) {
    return this.coursesService.create(req.user.userId, createCourseDto);
  }
  @Get()
  findAll(
    @Query('pageNumber', new DefaultValuePipe(1), ParseIntPipe)
    pageNumber: number,
    @Query('coursePerPage', new DefaultValuePipe(10), ParseIntPipe)
    coursePerPage: number,
    @Query('category') category: string,
    @Query('level') level: string,
    @Query('status') status: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.coursesService.findAll(
      pageNumber,
      coursePerPage,
      category,
      level,
      status,
      req.user,
    );
  }
  @Get('slug/:slug')
  findBySlug(
    @Param('slug') slug: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.coursesService.findBySlug(slug, req.user);
  }
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.coursesService.findOne(id, req.user);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: { user: { userId: string; role: UserRole } },
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, req.user, updateCourseDto);
  }
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.coursesService.remove(id, req.user);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.INSTRUCTOR)
  @Patch('submit-for-review/:id')
  submitForReview(
    @Param('id') id: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.coursesService.submitForReview(id, req.user);
  }
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('approve/:id')
  approve(
    @Param('id') id: string,

    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.coursesService.approve(id, req.user);
  }
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('reject/:id')
  reject(
    @Param('id') id: string,
    @Req() req: { user: { userId: string; role: UserRole } },
    @Body('reason') reason: string,
  ) {
    return this.coursesService.reject(id, req.user, reason);
  }
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Patch('unpublish/:id')
  unpublish(
    @Param('id') id: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.coursesService.unpublish(id, req.user);
  }
}
