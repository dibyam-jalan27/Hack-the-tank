const User = require("../models/User")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const { mailSender } = require("../utils/mailSender")
const {
  resetPasswordLinkTemplate,
} = require("../mails/templates/resetPasswordLinkTemplate")

//Creates Link for resetting password and sends it via mail
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req body
    const email = req.body.email

    //check user for this email , email validation
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "Your email is not registered with us. Kindly first create an account.",
      })
    }

    //generate token
    const token = crypto.randomUUID()
    //update user by adding token and expiration time

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        tokenExpiryTime: new Date(Date.now() + 30 * 60 * 1000),
      },
      { new: true }
    )

    //create url
    const url = `${process.env.REACT_APP_LINK}/update-password/${token}`
    //send mail containing the url
    await mailSender(
      email,
      "Password reset Link",
      resetPasswordLinkTemplate(email, user.firstName, url)
    )
    //return response
    return res.json({
      success: true,
      message: "Email sent successfully, please check email and change pwd",
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending reset password email.",
    })
  }
}

exports.resetPassword = async (req, res) => {
  try {
    //data fetch
    const { password, confirmPassword, token } = req.body
    //validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password not matching",
      })
    }

    //get userdetails from db using token
    const userDetails = await User.findOne({ token: token })

    //if no entry - invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      })
    }

    //token time check
    if (userDetails.tokenExpiryTime < Date.now) {
      return res.json({
        success: false,
        message: "Token is expired, please regenerate your token",
      })
    }
    //hash pwd
    const hashedPassword = await bcrypt.hash(password, 10)

    //password update
    await User.findByIdAndUpdate(
      userDetails._id,
      { password: hashedPassword, token: null },
      { new: true }
    )
    //return response
    return res.status(200).json({
      success: true,
      message: "Password reset successfull.",
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password.",
    })
  }
}
