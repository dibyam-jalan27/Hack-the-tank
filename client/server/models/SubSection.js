const mongoose = require("mongoose")

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    reqired: true,
  },
  description: {
    type: String,
    reqired: true,
  },
  timeDuration: {
    type: Number,
    default: 0,
    reqired: true,
  },
  videoUrl: {
    type: String,
    reqired: true,
  },
})

module.exports = mongoose.model("SubSection", subSectionSchema)
