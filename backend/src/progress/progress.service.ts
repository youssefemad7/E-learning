import mongoose, { Model } from 'mongoose';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { LessonProgress } from './lesson-progress.schema';
import { Enrollment, EnrollmentStatus } from '../enrollments/enrollment.schema';
import { Course } from '../courses/course.schema';
import { Lesson } from '../lessons/lesson.schema';
import { UserRole } from '../users/user.schema';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(LessonProgress.name)
    private readonly progressModel: Model<LessonProgress>,

    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<Enrollment>,

    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>,

    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<Lesson>,
  ) {}
  // TODO:
  // - Verify that the authenticated user is a STUDENT.
  // - Validate courseId and lessonId as valid MongoDB ObjectIds.
  // - Verify that the course exists.
  // - Verify that the lesson exists.
  // - Ensure that the lesson belongs to the requested course.
  // - Verify that the student has an ACTIVE enrollment in this course.
  // - Create or update the student's progress for this lesson.

  async updateLessonProgress(
    courseId: string,
    lessonId: string,
    user: { userId: string; role: UserRole },
    isCompleted: boolean,
  ) {
    //1. Verify that the authenticated user is a STUDENT.
    if (user.role !== UserRole.STUDENT) {
      throw new ForbiddenException(
        'You are not allowed to update lesson progress because you are not a student',
      );
    }

    //2. Validate courseId and verify that the course exists.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    //3. Validate lessonId and verify that the lesson exists.
    if (!lessonId || !mongoose.isValidObjectId(lessonId)) {
      throw new BadRequestException('Invalid Lesson ID');
    }

    const lesson = await this.lessonModel.findById(lessonId);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    //4. Ensure that the lesson belongs to the requested course.
    if (lesson.course.toString() !== courseId) {
      throw new BadRequestException(
        "This lesson doesn't belong to the requested course",
      );
    }

    //5. Verify that the student has an ACTIVE enrollment.
    const enrollment = await this.enrollmentModel.findOne({
      course: courseId,
      student: user.userId,
      status: EnrollmentStatus.ACTIVE,
    });

    if (!enrollment) {
      throw new ForbiddenException(
        'You must have an active enrollment to update lesson progress',
      );
    }

    //6. Create or update the student's progress.
    const progressFilter = {
      student: user.userId,
      lesson: lessonId,
    };

    const progressUpdate = {
      $set: {
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
      $setOnInsert: {
        student: user.userId,
        course: courseId,
        lesson: lessonId,
      },
    };

    try {
      return await this.progressModel.findOneAndUpdate(
        progressFilter,
        progressUpdate,
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );
    } catch (error) {
      // Handle concurrent requests that try to create the same progress.
      if ((error as { code?: number })?.code === 11000) {
        return await this.progressModel.findOneAndUpdate(
          progressFilter,
          {
            $set: {
              isCompleted,
              completedAt: isCompleted ? new Date() : null,
            },
          },
          {
            new: true,
            runValidators: true,
          },
        );
      }

      throw error;
    }
  }

  // TODO:
  // - Verify that the user is a STUDENT.
  // - Validate courseId.
  // - Verify that the course exists.
  // - Verify that the student has an ACTIVE enrollment.
  // - Retrieve all lessons belonging to this course.
  // - Retrieve all progress documents belonging to this student and course.
  // - Match each lesson with its progress document.
  // - Lessons without a progress document should be considered incomplete.
  async getCourseProgress(
    courseId: string,
    user: { userId: string; role: UserRole },
  ) {
    //1. Verify that the authenticated user is a STUDENT.
    if (user.role !== UserRole.STUDENT) {
      throw new ForbiddenException(
        'You are not allowed to view course progress because you are not a student',
      );
    }

    //2. Validate courseId and verify that the course exists.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    //3. Verify that the student has an ACTIVE enrollment.
    const enrollment = await this.enrollmentModel.findOne({
      course: courseId,
      student: user.userId,
      status: EnrollmentStatus.ACTIVE,
    });

    if (!enrollment) {
      throw new ForbiddenException(
        'You must have an active enrollment to view course progress',
      );
    }
    //4. Retrieve all lessons belonging to this course.
    const lessons = await this.lessonModel
      .find({ course: courseId })
      .select('_id title section sectionOrder lessonOrder')
      .sort({ sectionOrder: 1, lessonOrder: 1 });
    //5. Retrieve all progress documents belonging to this student and course.
    const progress = await this.progressModel
      .find({
        student: user.userId,
        course: courseId,
      })
      .sort({ updatedAt: -1 });
    //6. Match each lesson with its progress document.
    const progressMap = new Map(
      progress.map((item) => [item.lesson.toString(), item]),
    );
    const lessonsWithProgress = lessons.map((lesson) => {
      const lessonProgress = progressMap.get(lesson._id.toString());

      return {
        // Return only the lesson fields you need.
        _id: lesson._id,
        title: lesson.title,
        section: lesson.section,
        sectionOrder: lesson.sectionOrder,
        lessonOrder: lesson.lessonOrder,

        // Match the lesson with its progress.
        isCompleted: lessonProgress?.isCompleted ?? false,
        completedAt: lessonProgress?.completedAt ?? null,
      };
    });
    // Calculate:
    // - totalLessons: total number of lessons in the course.
    const totalLessons = lessons.length;
    // - completedLessons: number of completed lessons.
    const completedLessons = lessonsWithProgress.filter(
      (lesson) => lesson.isCompleted === true,
    ).length;
    // - progressPercentage: completedLessons / totalLessons * 100.
    const progressPercentage =
      totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;

    // - Last activity date (based on the latest progress updatedAt).
    const lastActivity = progress[0]?.updatedAt ?? null;

    return {
      course: course,
      totalLessons: totalLessons,
      completedLessons: completedLessons,
      progressPercentage: progressPercentage,
      lessons: lessonsWithProgress,
      lastActivity: lastActivity,
    };
  }

  // TODO:
  // - Verify that the user is a STUDENT.
  // - Retrieve all ACTIVE enrollments belonging to this student.
  // - Retrieve the related courses.
  // - Retrieve lessons and progress documents for those courses.
  // - Calculate progress separately for each course.

  async getMyCoursesProgress(user: { userId: string; role: UserRole }) {
    // 1. Verify that the authenticated user is a STUDENT.
    if (user.role !== UserRole.STUDENT) {
      throw new ForbiddenException(
        'You are not allowed to view course progress because you are not a student',
      );
    }

    // 2. Retrieve all ACTIVE enrollments belonging to this student.
    const enrollments = await this.enrollmentModel.find({
      student: user.userId,
      status: EnrollmentStatus.ACTIVE,
    });

    // No active enrollments means the student has no courses to display.
    if (enrollments.length === 0) {
      return [];
    }

    // 3. Extract all course IDs from the enrollments.
    const courseIds = enrollments.map((item) => item.course);

    // 4. Retrieve all related courses.
    const courses = await this.courseModel.find({
      _id: { $in: courseIds },
    });

    if (courses.length === 0) {
      return [];
    }

    // Get the IDs of the courses that actually exist.
    const existingCourseIds = courses.map((course) => course._id);

    // 5. Retrieve all lessons belonging to these courses.
    const lessons = await this.lessonModel
      .find({ course: { $in: existingCourseIds } })
      .select('_id title section sectionOrder lessonOrder course')
      .sort({ course: 1, sectionOrder: 1, lessonOrder: 1 });

    // 6. Retrieve all progress documents belonging to this student
    // and these courses, ordered by most recent activity.
    const progress = await this.progressModel
      .find({
        student: user.userId,
        course: { $in: existingCourseIds },
      })
      .sort({ updatedAt: -1 });

    // 7. Group lessons by their course ID.
    const lessonsByCourse = new Map<string, typeof lessons>();

    for (const lesson of lessons) {
      const courseId = lesson.course.toString();

      if (!lessonsByCourse.has(courseId)) {
        lessonsByCourse.set(courseId, []);
      }

      lessonsByCourse.get(courseId)!.push(lesson);
    }

    // 8. Create a lookup map for progress documents by lesson ID.
    const progressMap = new Map(
      progress.map((item) => [item.lesson.toString(), item]),
    );

    // 9. Get the latest activity date for each course.
    const lastActivityByCourse = new Map<string, Date>();

    for (const item of progress) {
      const courseId = item.course.toString();

      // Progress is already sorted by updatedAt descending.
      // The first document encountered for each course is its latest.
      if (!lastActivityByCourse.has(courseId) && item.updatedAt) {
        lastActivityByCourse.set(courseId, item.updatedAt);
      }
    }

    // 10. Calculate progress separately for each course.
    return courses.map((course) => {
      const courseId = course._id.toString();

      const courseLessons = lessonsByCourse.get(courseId) ?? [];

      const lessonsWithProgress = courseLessons.map((lesson) => {
        const lessonProgress = progressMap.get(lesson._id.toString());

        return {
          _id: lesson._id,
          title: lesson.title,
          section: lesson.section,
          sectionOrder: lesson.sectionOrder,
          lessonOrder: lesson.lessonOrder,
          isCompleted: lessonProgress?.isCompleted ?? false,
          completedAt: lessonProgress?.completedAt ?? null,
        };
      });

      const totalLessons = courseLessons.length;

      const completedLessons = lessonsWithProgress.filter(
        (lesson) => lesson.isCompleted,
      ).length;

      const progressPercentage =
        totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;

      return {
        course,
        totalLessons,
        completedLessons,
        progressPercentage,
        lessons: lessonsWithProgress,
        lastActivity: lastActivityByCourse.get(courseId) ?? null,
      };
    });
  }
}
