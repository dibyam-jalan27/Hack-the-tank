const mongoose = require("mongoose")
const SubSection = require("./SubSection")

const SectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    reqired: true,
  },
  subSections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
  totalTimeDuration: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model("Section", SectionSchema)
