const nodemailer = require("nodemailer")
require("dotenv").config()

exports.mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    let info = await transporter.sendMail({
      from: `StudyNotion ${process.env.MAIL_USER}`,
      to: email, //`${email}`,
      subject: title, //same as above
      html: body, //same as above
    })

    return info
  } catch (error) {
    //console.log("!! Error occured while sending mail !!")
    console.error(error)
  }
}
