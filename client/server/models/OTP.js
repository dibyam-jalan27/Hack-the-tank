const mongoose = require("mongoose")
const { mailSender } = require("../utils/mailSender")
const otpTemplate = require("../mails/templates/emailVerificationTemplate")

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 1, // The document will be automatically deleted after 1 minutes of its creation time
  },
})

const sendVerificationEmail = async (email, otp) => {
  try {
    const response = await mailSender(
      email,
      "Verification Email",
      otpTemplate(otp)
    )
  } catch (error) {
    //console.log("!!  Error occured while sending mail !!")
    console.error(error)
  }
}

otpSchema.pre("save", async function (next) {
  //console.log("New document saved to database")

  // 🟩🟥🟦 isNew?? Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp)
  }
  next()
})

module.exports = mongoose.model("OTP", otpSchema)
