import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { UserRole } from '../users/user.schema';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.STUDENT)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}
  @Post(':courseId')
  enroll(
    @Param('courseId') courseId: string,
    @Req() req: { user: { userId: string; role: UserRole } },
  ) {
    return this.enrollmentsService.enroll(courseId, req.user);
  }

  @Get()
  findMyCourses(@Req() req: { user: { userId: string } }) {
    return this.enrollmentsService.findMyCourses(req.user.userId);
  }
  @Get('check/:courseId')
  checkEnrollment(
    @Param('courseId') courseId: string,
    @Req() req: { user: { userId: string } },
  ) {
    return this.enrollmentsService.checkEnrollment(courseId, req.user.userId);
  }
  @Get(':courseId')
  findOne(
    @Param('courseId') courseId: string,
    @Req() req: { user: { userId: string } },
  ) {
    return this.enrollmentsService.findOne(courseId, req.user.userId);
  }

  @Patch('cancel/:courseId')
  cancel(
    @Param('courseId') courseId: string,
    @Req() req: { user: { userId: string } },
  ) {
    return this.enrollmentsService.cancel(courseId, req.user.userId);
  }
}
