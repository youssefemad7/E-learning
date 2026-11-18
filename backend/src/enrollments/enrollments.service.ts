import mongoose, { Model } from 'mongoose';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRole } from '../users/user.schema';
import { Course } from '../courses/course.schema';
import { Enrollment } from './enrollment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CourseStatus } from '../courses/course.schema';
import { EnrollmentStatus } from './enrollment.schema';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Enrollment.name) private enrollmentModel: Model<Enrollment>,
  ) {}
  // TODO:
  // - Verify that the user is a student.
  // - Verify that the course exists.
  // - Verify that the course is published.
  // - Verify that the course is free.
  // - Prevent the instructor from enrolling in their own course.
  // - Check whether an enrollment already exists.
  // - If an active enrollment exists, reject the request.
  // - If a cancelled enrollment exists, reactivate it.
  // - Otherwise, create a new enrollment.
  async enroll(courseId: string, user: { userId: string; role: UserRole }) {
    //1. Verify that the user is a student.

    if (user.role !== UserRole.STUDENT) {
      throw new ForbiddenException(
        "You are not allowed to enroll this course because You aren't student",
      );
    }
    // 2. Verify that the course exists.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    const enrollment = await this.enrollmentModel.findOne({
      student: user.userId,
      course: courseId,
    });
    // 3. Verify that the course is published.
    if (course.status !== CourseStatus.PUBLISHED) {
      throw new ForbiddenException(
        "You are not allowed to enroll this course because course isn't published",
      );
    }
    // 4. Verify that the course is free.
    if (course.price !== 0) {
      throw new ForbiddenException("course isn't free");
    }
    // 5. Prevent the instructor from enrolling in their own course.
    if (user.userId === course.instructor.toString()) {
      throw new ForbiddenException(
        'You are not allowed to enroll this course because you are the instructor of the course',
      );
    }
    // 6. Check whether an enrollment already exists, If an active enrollment exists, reject the request.

    if (enrollment && enrollment.status === EnrollmentStatus.ACTIVE) {
      throw new ForbiddenException(
        'You are not allowed to enroll this course because you are already enroll it',
      );
    }
    // 7. If a cancelled enrollment exists, reactivate it.
    if (enrollment && enrollment.status === EnrollmentStatus.CANCELLED) {
      enrollment.status = EnrollmentStatus.ACTIVE;
      enrollment.enrolledAt = new Date();
      enrollment.cancelledAt = null;
    }
    // - Otherwise, create a new enrollment.

    try {
      if (enrollment) {
        return await enrollment.save();
      }
      return await this.enrollmentModel.create({
        course: courseId,
        student: user.userId,
      });
    } catch (error) {
      if ((error as { code?: number })?.code === 11000) {
        throw new ConflictException('You are already enrolled in this course');
      }
      throw error;
    }
  }

  // TODO:
  // - Retrieve all active enrollments belonging to the student.
  // - Populate the related course information.
  // - Return the student's enrolled courses.
  async findMyCourses(userId: string) {
    return await this.enrollmentModel
      .find({
        student: userId,
        status: EnrollmentStatus.ACTIVE,
      })
      .populate('course')
      .exec();
  }

  // TODO:
  // - Verify that the course exists.
  // - Find the enrollment for this student and course.
  // - Return the enrollment if it exists.
  // - Handle missing or cancelled enrollments appropriately.
  async findOne(courseId: string, userId: string) {
    // 1. Verify that the course exists.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    //2. Find the enrollment for this student and course
    const enrollment = await this.enrollmentModel.findOne({
      student: userId,
      course: courseId,
    });
    //3. Handle missing or cancelled enrollments appropriately
    if (!enrollment) {
      throw new NotFoundException('There is no enrollment for this Course');
    }
    if (enrollment.status === EnrollmentStatus.CANCELLED) {
      throw new ForbiddenException(
        "Can't return this Enrollment course because it is cancelled ",
      );
    }
    return enrollment;
  }

  // TODO:
  //   Verify that the course exists.
  // - Find the enrollment for this student and course.
  // - Handle missing or cancelled enrollments appropriately.
  // - Verify that an active enrollment exists.
  // - Change its status to cancelled.
  // - Set cancelledAt to the current date.
  // - Preserve the enrollment document instead of deleting it.
  async cancel(courseId: string, userId: string) {
    // 1. Verify that the course exists.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    //2. Find the enrollment for this student and course
    const enrollment = await this.enrollmentModel.findOne({
      student: userId,
      course: courseId,
    });
    // 3. Handle missing or cancelled enrollments appropriately.

    if (!enrollment) {
      throw new NotFoundException('There is no enrollment for this Course');
    }
    if (enrollment.status === EnrollmentStatus.CANCELLED) {
      throw new ForbiddenException('Enrollment is already cancelled ');
    }
    // 4. Verify that an active enrollment exists & Change its status to cancelled& Set cancelledAt to the current date.
    enrollment.status = EnrollmentStatus.CANCELLED;
    enrollment.cancelledAt = new Date();
    // 5. Preserve the enrollment document instead of deleting it.
    return enrollment.save();
  }

  // TODO:
  // - Check whether an active enrollment exists
  //   for this student and course.
  // - Return whether the student has access through enrollment.
  async checkEnrollment(courseId: string, userId: string) {
    // 1. Verify that the course exists.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    //2. Find the enrollment for this student and course
    const enrollment = await this.enrollmentModel.findOne({
      student: userId,
      course: courseId,
    });

    // 3. Return whether the student has access through enrollment
    if (!enrollment) {
      return false;
    }
    if (enrollment.status === EnrollmentStatus.ACTIVE) {
      return true;
    }
    return false;
  }
}
