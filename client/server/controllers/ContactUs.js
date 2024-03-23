const {
  contactUsEmailtoUser,
  contactUsEmailtoService,
} = require("../mails/templates/contactFormEmail")
const { mailSender } = require("../utils/mailSender")
require("dotenv").config()

exports.contactUsController = async (req, res) => {
  const { email, firstName, lastName, message, phoneNo, countryCode } = req.body
  //console.log(req.body)
  try {
    await mailSender(
      process.env.INFO_MAIL,
      "Contact Request Recived",
      contactUsEmailtoService(
        email,
        firstName,
        lastName,
        message,
        phoneNo,
        countryCode
      )
    )

    await mailSender(
      email,
      "Your Data sent successfully",
      contactUsEmailtoUser(
        email,
        firstName,
        lastName,
        message,
        phoneNo,
        countryCode
      )
    )

    return res.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.error("Error", error)
    //console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
