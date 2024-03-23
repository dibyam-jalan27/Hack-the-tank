const mongoose = require("mongoose")

const courseProgressSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  totalVideos: {
    type: Number,
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
})

module.exports = mongoose.model("CourseProgress", courseProgressSchema)
