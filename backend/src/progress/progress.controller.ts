import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
  ParseBoolPipe,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UserRole } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('progress')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.STUDENT)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}
  @Patch('courses/:courseId/lessons/:lessonId')
  async updateLessonProgress(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @Req() req: { user: { userId: string; role: UserRole } },
    @Body('isCompleted', ParseBoolPipe) isCompleted: boolean,
  ) {
    return await this.progressService.updateLessonProgress(
      courseId,
      lessonId,
      req.user,
      isCompleted,
    );
  }

  @Get('courses/:courseId')
  async getCourseProgress(
    @Param('courseId') courseId: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return await this.progressService.getCourseProgress(courseId, req.user);
  }

  @Get('my-courses')
  async getMyCoursesProgress(
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return await this.progressService.getMyCoursesProgress(req.user);
  }
}
