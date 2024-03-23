const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
  profession: {
    type: String,
    enum: ["Developer", "UG/PG Student", "Teacher"],
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  about: {
    type: String,
    trim: true,
  },
})

module.exports = mongoose.model("Profile", profileSchema)
