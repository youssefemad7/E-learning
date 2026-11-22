import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../courses/course.schema';
import { AuthModule } from '../auth/auth.module';
import { EnrollmentsModule } from '../enrollments/enrollments.module';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { LessonProgress, LessonProgressSchema } from './lesson-progress.schema';
import { Lesson, LessonSchema } from '../lessons/lesson.schema';
import { Enrollment, EnrollmentSchema } from '../enrollments/enrollment.schema';

@Module({
  imports: [
    AuthModule,
    EnrollmentsModule,
    MongooseModule.forFeature([
      { name: LessonProgress.name, schema: LessonProgressSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {}
