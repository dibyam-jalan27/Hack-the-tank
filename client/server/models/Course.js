const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      reqired: true,
    },
    description: {
      type: String,
      reqired: true,
    },
    learning: {
      type: String,
    },
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    duration: {
      type: Number,
      default: 0,
    },
    ratingAndReview: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tag: {
      type: [String],
    },
    thumbnail: {
      type: String,
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    price: {
      type: Number,
      reqired: true,
    },
    instructions: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Course", courseSchema)
