import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please enter course title"],
      minLength: [4, "title must be atleast 4 characters long"],
      maxLength: [80, "title can't exceed 80 characters"],
    },
    description: {
      type: String,
      required: true,
      minLength: [20, "description must be at least 20 characters long"],
    },
    // Lectures title,description,videos { public_id,url}
    lectures: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        video: {
          public_id: { type: String, required: true },
          url: { type: String, required: true },
        },
      },
    ],
    poster: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    views: {
      type: Number,
      default: 0,
    },
    numOfVideos: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: [true, "Enter course creator name"],
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("save", function (next) {
  if (!this.isModified("lectures")) return next();
  this.numOfVideos = this.lectures.length;
  next();
});

export default model("Course", courseSchema);
