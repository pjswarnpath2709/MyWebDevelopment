import Course from "../models/Course.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import CustomError from "../utils/CustomError.js";
import { CourseErrors } from "../constants/Error.js";
import { checkAllProvided } from "../utils/helper.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import Stats from "../models/Stats.js";

export const getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";
  const courses = await Course.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  }).select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncErrors(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  if (!checkAllProvided(title, description, category, createdBy))
    throw new CustomError(CourseErrors.RequiredFieldsNotProvided);
  const file = req.file;
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "course created successfully. You can add lectures now",
  });
});

export const getCourseLectures = catchAsyncErrors(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) throw new CustomError(CourseErrors.CourseNotFound);
  course.views += 1;
  await course.save();
  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

export const addLecture = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const file = req.file;
  if (!checkAllProvided(title, description, file))
    throw new CustomError(CourseErrors.RequiredFieldsNotProvided);
  const course = await Course.findById(id);
  if (!course) throw new CustomError(CourseErrors.CourseNotFound);
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });
  course.lectures.push({
    title,
    description,
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  await course.save();
  res.status(200).json({
    success: true,
    message: "lecture added in course",
  });
});

export const deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) throw new CustomError(CourseErrors.CourseNotFound);
  const myCloud = cloudinary.v2.uploader;
  await myCloud.destroy(course.poster.public_id);
  for (let i = 0; i < course.lectures.length; i++) {
    await myCloud.destroy(course.lectures[i].video.public_id, {
      resource_type: "video",
    });
  }
  await course.deleteOne();
  res.status(200).json({
    success: true,
    message: "deleted course successfully",
  });
});

export const deleteLecture = catchAsyncErrors(async (req, res, next) => {
  const { lectureId, courseId } = req.query;
  console.log("\x1b[35m", "👉👉👉 lectureId , courseId :", lectureId, courseId);
  const course = await Course.findById(courseId);
  if (!course) throw new CustomError(CourseErrors.CourseNotFound);
  const myCloud = cloudinary.v2.uploader;
  const lecturesToKeep = [];
  for (const lecture of course.lectures) {
    if (lecture._id.toString() !== lectureId.toString()) {
      lecturesToKeep.push(lecture);
    } else {
      await myCloud.destroy(lecture.video.public_id, {
        resource_type: "video",
      });
    }
  }
  course.lectures = lecturesToKeep;
  await course.save();
  res.status(200).json({
    success: true,
    message: "lecture deleted successfully",
  });
});

Course.watch().on("change", async () => {
  const stats = await Stats.find().sort({ createdAt: "desc" }).limit(1);
  if (stats.length <= 0) return;
  const courses = await Course.find();
  let totalViews = 0;
  for (let i = 0; i < courses.length; i++) {
    totalViews += courses[i].views;
  }

  stats[0].views = totalViews;
  stats[0].createdAt = new Date(Date.now());
  await stats[0].save();
});
