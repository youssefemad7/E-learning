import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './create-lesson.dto';
import { UserRole } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UpdateLessonDto } from './update-lesson.dto';
@Controller('lessons')
@UseGuards(JwtAuthGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Post(':courseId')
  async createLesson(
    @Body() createLessonDto: CreateLessonDto,
    @Req() req: { user: { userId: string; role: UserRole } },
    @Param('courseId') courseId: string,
  ) {
    return await this.lessonsService.createLesson(
      courseId,
      req.user,
      createLessonDto,
    );
  }
  @Get(':courseId')
  findAllLessons(
    @Param('courseId') courseId: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.lessonsService.findAllLessons(courseId, req.user);
  }
  @Get('single/:lessonId')
  findOneLesson(
    @Param('lessonId') lessonId: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.lessonsService.findOneLesson(lessonId, req.user);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Patch(':courseId/:lessonId')
  updateLesson(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @Req() req: { user: { userId: string; role: UserRole } },
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.updateLesson(
      courseId,
      lessonId,
      req.user,
      updateLessonDto,
    );
  }
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Delete(':courseId/:lessonId')
  deleteLesson(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.lessonsService.deleteLesson(courseId, lessonId, req.user);
  }
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Patch(':courseId/sections/rename')
  renameSection(
    @Param('courseId') courseId: string,
    @Req() req: { user: { userId: string; role: UserRole } },
    @Body('oldSectionName') oldSectionName: string,
    @Body('newSectionName') newSectionName: string,
  ) {
    return this.lessonsService.renameSection(
      courseId,
      oldSectionName,
      newSectionName,
      req.user,
    );
  }
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Patch(':courseId/sections/reorder')
  reorderSections(
    @Param('courseId') courseId: string,
    @Req() req: { user: { userId: string; role: UserRole } },
    @Body() sectionNames: string[],
  ) {
    return this.lessonsService.reorderSections(
      courseId,
      sectionNames,
      req.user,
    );
  }
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @Patch(':courseId/lessons/reorder')
  reorderLessons(
    @Param('courseId') courseId: string,
    @Body('sectionName') sectionName: string,
    @Body('lessonIds') lessonIds: string[],
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.lessonsService.reorderLessons(
      courseId,
      sectionName,
      lessonIds,
      req.user,
    );
  }
}
