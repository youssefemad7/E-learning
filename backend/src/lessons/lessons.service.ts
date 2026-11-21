import mongoose, { Model } from 'mongoose';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Course } from '../courses/course.schema';
import { Lesson } from './lesson.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from '../users/user.schema';
import { CreateLessonDto } from './create-lesson.dto';
import { CourseStatus } from '../courses/course.schema';
import { UpdateLessonDto } from './update-lesson.dto';
import { EnrollmentsService } from '../enrollments/enrollments.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}
  // Create a new lesson:
  // - Verify that the course exists.
  // - Verify that the authenticated user owns the course.
  // - Allow Admin access regardless of ownership.
  // - Normalize the section name.
  // - Check whether the section already exists in this course.
  // - If it exists, use its existing sectionOrder.
  // - If it is new, assign the next available sectionOrder.
  // - Assign the next available lessonOrder within the section.
  // - Create and return the lesson.

  async createLesson(
    courseId: string,
    user: { userId: string; role: UserRole },
    createLessonDto: CreateLessonDto,
  ) {
    // 1. Verify that the course exists.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 2. Verify ownership or Admin access.
    if (
      user.role !== UserRole.ADMIN &&
      (user.role !== UserRole.INSTRUCTOR ||
        user.userId !== course.instructor.toString())
    ) {
      throw new ForbiddenException(
        'You are not allowed to add lessons to this course',
      );
    }

    // 3. Normalize section name.
    const sec = createLessonDto.section
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');

    // 4. Check whether the section already exists.
    const existingSection = await this.lessonModel
      .findOne({ course: courseId, section: sec })
      .select('sectionOrder');

    let sectionOrder: number;

    if (existingSection) {
      sectionOrder = existingSection.sectionOrder;
    } else {
      const lastSection = await this.lessonModel
        .findOne({ course: courseId })
        .sort({ sectionOrder: -1 })
        .select('sectionOrder');

      sectionOrder = lastSection ? lastSection.sectionOrder + 1 : 1;
    }

    // 5. Determine the next lesson order within the section.
    const lastLesson = await this.lessonModel
      .findOne({ course: courseId, section: sec })
      .sort({ lessonOrder: -1 })
      .select('lessonOrder');

    const lessonOrder = lastLesson ? lastLesson.lessonOrder + 1 : 1;

    // 6. Create and save the lesson.
    const createdLesson = await this.lessonModel.create({
      ...createLessonDto,
      course: courseId,
      section: sec,
      sectionOrder,
      lessonOrder,
    });

    return createdLesson;
  }

  // Get all lessons belonging to a specific course:
  // - Verify that the course exists.
  // - Retrieve all its lessons.
  // - Group lessons by section.
  // - Sort sections by sectionOrder.
  // - Sort lessons within each section by lessonOrder.
  // - Return the course curriculum grouped into sections.
  async findAllLessons(
    courseId: string,
    user: { userId: string; role: UserRole },
  ) {
    const lessonMap = new Map<
      string,
      {
        sectionOrder: number;
        lessons: {
          id: string;
          title: string;
          lessonOrder: number;
          duration: number;
          isPreview: boolean;
        }[];
      }
    >();

    // 1. Verify that the course exists.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 2. Verify ownership or Admin access.
    if (
      course.status !== CourseStatus.PUBLISHED &&
      user.role !== UserRole.ADMIN &&
      (user.role !== UserRole.INSTRUCTOR ||
        user.userId !== course.instructor.toString())
    ) {
      throw new ForbiddenException(
        'You are not allowed to view lessons of this course',
      );
    }
    const lessons = await this.lessonModel
      .find({ course: courseId })
      .sort({ sectionOrder: 1, lessonOrder: 1 });
    // 3. Return the course curriculum grouped into sections.
    for (const lesson of lessons) {
      if (!lessonMap.has(lesson.section)) {
        lessonMap.set(lesson.section, {
          sectionOrder: lesson.sectionOrder,
          lessons: [],
        });
      }

      const curSec = lessonMap.get(lesson.section)!;

      curSec.lessons.push({
        id: lesson._id.toString(),
        title: lesson.title,
        lessonOrder: lesson.lessonOrder,
        duration: lesson.duration,
        isPreview: lesson.isPreview,
      });
    }

    const sections = Array.from(lessonMap, ([name, value]) => ({
      name,
      ...value,
    }));
    return {
      courseId,
      sections,
    };
  }

  // Find a specific lesson and enforce its access policy.
  async findOneLesson(
    lessonId: string,
    user: { userId: string; role: UserRole },
  ) {
    if (!lessonId || !mongoose.isValidObjectId(lessonId)) {
      throw new BadRequestException('Invalid Lesson ID');
    }

    const lesson = await this.lessonModel.findById(lessonId);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const course = await this.courseModel.findById(lesson.course);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Admin can access every lesson.
    if (user.role === UserRole.ADMIN) {
      return lesson;
    }

    // The course owner can access all lessons in their course.
    if (
      user.role === UserRole.INSTRUCTOR &&
      user.userId === course.instructor.toString()
    ) {
      return lesson;
    }

    // All other access requires a published course.

    if (course.status !== CourseStatus.PUBLISHED) {
      throw new ForbiddenException('This course is not available');
    }

    // Only students can access preview lessons without enrollment.
    if (user.role !== UserRole.STUDENT) {
      throw new ForbiddenException(
        'You are not allowed to access this lesson',
      );
    }

    if (lesson.isPreview) {
      return lesson;
    }

    const hasEnrollment = await this.enrollmentsService.checkEnrollment(
      course._id.toString(),
      user.userId,
    );

    if (!hasEnrollment) {
      throw new ForbiddenException(
        'You must enroll in this course to access this lesson',
      );
    }

    return lesson;
  }

  // Update a specific lesson:
  // - Verify that the lesson exists.
  // - Verify course ownership or Admin access.
  // - Validate the updated data.
  // - Prevent changing the lesson's course through this operation.
  // - Preserve section ordering rules if the lesson moves to another section.
  // - Update and return the lesson.
  async updateLesson(
    courseId: string,
    lessonId: string,
    user: { userId: string; role: UserRole },
    updateLessonDto: UpdateLessonDto,
  ) {
    const { section, title, description, videoUrl, duration, isPreview } =
      updateLessonDto;

    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (!lessonId || !mongoose.isValidObjectId(lessonId)) {
      throw new BadRequestException('Invalid Lesson ID');
    }

    const lesson = await this.lessonModel.findById(lessonId);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    if (lesson.course.toString() !== courseId) {
      throw new NotFoundException('Lesson not found in this course');
    }

    // 2. Verify ownership or Admin access.
    if (
      user.role !== UserRole.ADMIN &&
      (user.role !== UserRole.INSTRUCTOR ||
        user.userId !== course.instructor.toString())
    ) {
      throw new ForbiddenException(
        'You are not allowed to Update lesson of this course',
      );
    }
    const sec = section?.trim().toLowerCase().replace(/\s+/g, ' ');
    // 3. Normalize section name.
    if (sec !== undefined && lesson.section !== sec) {
      const existingSection = await this.lessonModel
        .findOne({ _id: { $ne: lesson._id }, course: courseId, section: sec })
        .select('sectionOrder');

      let sectionOrder: number;

      if (existingSection) {
        sectionOrder = existingSection.sectionOrder;
      } else {
        const lastSection = await this.lessonModel
          .findOne({ course: courseId })
          .sort({ sectionOrder: -1 })
          .select('sectionOrder');

        sectionOrder = lastSection ? lastSection.sectionOrder + 1 : 1;
      }
      // 5. Determine the next lesson order within the section.
      const lastLesson = await this.lessonModel
        .findOne({ course: courseId, section: sec })
        .sort({ lessonOrder: -1 })
        .select('lessonOrder');

      const lessonOrder = lastLesson ? lastLesson.lessonOrder + 1 : 1;
      lesson.lessonOrder = lessonOrder;
      lesson.sectionOrder = sectionOrder;
      lesson.section = sec;
    }
    if (title != undefined) {
      lesson.title = title;
    }
    if (description != undefined) {
      lesson.description = description;
    }
    if (videoUrl != undefined) {
      lesson.videoUrl = videoUrl;
    }

    if (duration != undefined) {
      lesson.duration = duration;
    }
    if (isPreview != undefined) {
      lesson.isPreview = isPreview;
    }

    // 6. Create and save the lesson.

    return await lesson.save();
  }

  // Delete a specific lesson:
  // - Verify that the lesson exists.
  // - Verify course ownership or Admin access.
  // - Delete the lesson.
  // - Handle the remaining lesson ordering within its section.
  // - Handle the section if it becomes empty.

  async deleteLesson(
    courseId: string,
    lessonId: string,
    user: { userId: string; role: UserRole },
  ) {
    // 1. Verify that the course exists.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    const course = await this.courseModel.findById(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 2. Verify that the lesson exists and belongs to this course.
    if (!lessonId || !mongoose.isValidObjectId(lessonId)) {
      throw new BadRequestException('Invalid Lesson ID');
    }

    const lesson = await this.lessonModel.findById(lessonId);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (lesson.course.toString() !== courseId) {
      throw new NotFoundException('Lesson not found in this course');
    }

    // 3. Verify ownership or Admin access.
    if (
      user.role !== UserRole.ADMIN &&
      (user.role !== UserRole.INSTRUCTOR ||
        user.userId !== course.instructor.toString())
    ) {
      throw new ForbiddenException(
        'You are not allowed to Delete lesson of this course',
      );
    }

    // 4. Delete the lesson.
    const deletedLesson = await this.lessonModel.findByIdAndDelete(lessonId);

    // 5. Reorder the remaining lessons in the same section.
    const remainingLessons = await this.lessonModel
      .find({
        course: courseId,
        section: lesson.section,
      })
      .sort({ lessonOrder: 1 });

    let lessonCount = 1;

    for (const remainingLesson of remainingLessons) {
      remainingLesson.lessonOrder = lessonCount;
      lessonCount++;
      await remainingLesson.save();
    }

    // 6. If the section is empty, reorder the remaining sections.
    if (remainingLessons.length === 0) {
      const remainingSections = await this.lessonModel
        .find({ course: courseId })
        .sort({ sectionOrder: 1 });

      const sectionMap = new Map<string, number>();

      for (const remainingLesson of remainingSections) {
        if (!sectionMap.has(remainingLesson.section)) {
          sectionMap.set(remainingLesson.section, remainingLesson.sectionOrder);
        }
      }

      const sortedSections = Array.from(sectionMap).sort((a, b) => a[1] - b[1]);

      let sectionCount = 1;

      for (const [sectionName] of sortedSections) {
        await this.lessonModel.updateMany(
          { course: courseId, section: sectionName },
          { $set: { sectionOrder: sectionCount } },
        );

        sectionCount++;
      }
    }

    return deletedLesson;
  }

  // Rename a section:
  // - Verify that the course exists.
  // - Verify course ownership or Admin access.
  // - Normalize section names.
  // - Ensure that the old section exists.
  // - Ensure that the new name does not conflict with another section.
  // - Update the section name in all its lessons.
  async renameSection(
    courseId: string,
    oldSectionName: string,
    newSectionName: string,
    user: { userId: string; role: UserRole },
  ) {
    // 1. Validate Course ID.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    // 2. Verify that the course exists.
    const course = await this.courseModel.findById(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 3. Verify ownership or Admin access.
    if (
      user.role !== UserRole.ADMIN &&
      (user.role !== UserRole.INSTRUCTOR ||
        user.userId !== course.instructor.toString())
    ) {
      throw new ForbiddenException(
        'You are not allowed to rename sections in this course',
      );
    }

    // 4. Normalize section names.
    const oldSec = oldSectionName.trim().toLowerCase().replace(/\s+/g, ' ');

    const newSec = newSectionName.trim().toLowerCase().replace(/\s+/g, ' ');

    // 5. Validate section names.
    if (!oldSec || !newSec) {
      throw new BadRequestException('Section names cannot be empty');
    }

    // 6. Verify that the old section exists.
    const existingSection = await this.lessonModel.findOne({
      course: courseId,
      section: oldSec,
    });

    if (!existingSection) {
      throw new NotFoundException('Section not found in this course');
    }

    // 7. If the names are identical, no update is needed.
    if (oldSec === newSec) {
      return {
        message: 'Section name is already the same',
        modifiedCount: 0,
      };
    }

    // 8. Ensure that the new name does not conflict with another section.
    const existSec = await this.lessonModel.findOne({
      course: courseId,
      section: newSec,
    });

    if (existSec) {
      throw new BadRequestException(
        'This section name is already used in this course',
      );
    }

    // 9. Update all lessons belonging to the old section.
    const result = await this.lessonModel.updateMany(
      { course: courseId, section: oldSec },
      { $set: { section: newSec } },
    );

    return {
      message: 'Section renamed successfully',
      modifiedCount: result.modifiedCount,
    };
  }

  // Reorder sections within a course:
  // - Verify course ownership or Admin access.
  // - Validate that all requested sections belong to the course.
  // - Ensure that no section is missing or duplicated.
  // - Update sectionOrder for all affected lessons.

  async reorderSections(
    courseId: string,
    sectionNames: string[],
    user: { userId: string; role: UserRole },
  ) {
    // 1. Validate Course ID.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    // 2. Verify that the course exists.
    const course = await this.courseModel.findById(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 3. Verify ownership or Admin access.
    if (
      user.role !== UserRole.ADMIN &&
      (user.role !== UserRole.INSTRUCTOR ||
        user.userId !== course.instructor.toString())
    ) {
      throw new ForbiddenException(
        'You are not allowed to reorder sections in this course',
      );
    }

    // 4. Validate the input.
    if (
      !Array.isArray(sectionNames) ||
      sectionNames.some((name) => typeof name !== 'string' || !name.trim())
    ) {
      throw new BadRequestException('Invalid section names');
    }

    // 5. Get all existing section names in this course.
    const existingSections = await this.lessonModel.distinct('section', {
      course: courseId,
    });

    // 6. Ensure there are no duplicate section names.
    const uniqueSections = new Set(sectionNames);

    if (uniqueSections.size !== sectionNames.length) {
      throw new BadRequestException('Duplicate section names are not allowed');
    }

    // 7. Ensure all sections are included and belong to this course.
    if (
      sectionNames.length !== existingSections.length ||
      !sectionNames.every((name) => existingSections.includes(name))
    ) {
      throw new BadRequestException(
        'You must send all existing section names in the correct format',
      );
    }

    // 8. Update sectionOrder according to the requested order.
    let modifiedCount = 0;

    for (let i = 0; i < sectionNames.length; i++) {
      const result = await this.lessonModel.updateMany(
        {
          course: courseId,
          section: sectionNames[i],
        },
        {
          $set: { sectionOrder: i + 1 },
        },
      );

      modifiedCount += result.modifiedCount;
    }

    // 9. Return the result.
    return {
      message: 'Sections reordered successfully',
      modifiedCount,
    };
  }

  // Reorder lessons within a section:
  // - Verify course ownership or Admin access.
  // - Verify that all requested lessons belong to the same section.
  // - Ensure that no lesson is missing or duplicated.
  // - Update lessonOrder according to the requested order.

  async reorderLessons(
    courseId: string,
    sectionName: string,
    lessonIds: string[],
    user: { userId: string; role: UserRole },
  ) {
    // 1. Validate Course ID.
    if (!courseId || !mongoose.isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid Course ID');
    }

    // 2. Verify that the course exists.
    const course = await this.courseModel.findById(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 3. Verify ownership or Admin access.
    if (
      user.role !== UserRole.ADMIN &&
      (user.role !== UserRole.INSTRUCTOR ||
        user.userId !== course.instructor.toString())
    ) {
      throw new ForbiddenException(
        'You are not allowed to reorder lessons in this course',
      );
    }

    // 4. Normalize and validate section name.
    const sec = sectionName?.trim().toLowerCase().replace(/\s+/g, ' ');

    if (!sec) {
      throw new BadRequestException('Invalid section name');
    }

    // 5. Validate lessonIds input.
    if (
      !Array.isArray(lessonIds) ||
      lessonIds.some(
        (id) => typeof id !== 'string' || !mongoose.isValidObjectId(id),
      )
    ) {
      throw new BadRequestException('Invalid Lesson IDs');
    }

    // 6. Get all lessons belonging to this section.
    const existingLessons = await this.lessonModel
      .find({ course: courseId, section: sec })
      .select('_id');

    if (existingLessons.length === 0) {
      throw new NotFoundException('Section not found in this course');
    }

    // 7. Ensure there are no duplicate lesson IDs.
    const uniqueLessonIds = new Set(lessonIds);

    if (uniqueLessonIds.size !== lessonIds.length) {
      throw new BadRequestException('Duplicate lesson IDs are not allowed');
    }

    // 8. Ensure all lessons are included and belong to this section.
    const existingLessonIds = existingLessons.map((lesson) =>
      lesson._id.toString(),
    );

    if (
      lessonIds.length !== existingLessonIds.length ||
      !lessonIds.every((id) => existingLessonIds.includes(id))
    ) {
      throw new BadRequestException(
        'You must send all lesson IDs belonging to this section',
      );
    }

    // 9. Update lessonOrder according to the requested order.
    let modifiedCount = 0;

    for (let i = 0; i < lessonIds.length; i++) {
      const result = await this.lessonModel.updateOne(
        {
          _id: lessonIds[i],
          course: courseId,
          section: sec,
        },
        {
          $set: { lessonOrder: i + 1 },
        },
      );

      modifiedCount += result.modifiedCount;
    }

    // 10. Return the result.
    return {
      message: 'Lessons reordered successfully',
      modifiedCount,
    };
  }
}
