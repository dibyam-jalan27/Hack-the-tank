const otpGen = require("otp-generator")
const emailValidator = require("deep-email-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const OTP = require("../models/OTP")
const { mailSender } = require("../utils/mailSender")
const { passwordUpdated } = require("../mails/templates/passwordUpdate")
const Profile = require("../models/Profile")
require("dotenv").config()

//OTP Gernerator & Sender  for email verification

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body
    // Email Validation

    if (!email) {
      return res.status(400).send({
        succes: false,
        message: "Email missing.",
      })
    }

    /**🟥🟦🟩 giving error Timeout */
    // const isEmailValid = await emailValidator.validate(email);
    // const { valid, reason, validators } = isEmailValid;

    // if (!valid) {
    //    return res.status(400).json({
    //       message: "Please provide a valid email address.",
    //       reason: validators[reason].reason
    //    })
    // }

    // User already exist
    const checkUserExist = await User.findOne({ email })

    if (checkUserExist) {
      return res.status(401).json({
        succes: false,
        message: "User already have an account.",
      })
    }

    var otp = otpGen.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })

    //check for unique OTP
    const uniqueOTP = await OTP.findOne({ otp })

    while (uniqueOTP) {
      otp = otpGen.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })

      uniqueOTP = await OTP.findOne({ otp })
    }

    const otpPayload = { email, otp }

    //create OTP entry in DB
    //pre middleware of OTP will be called and it will send the mail to the user
    const OTPentry = OTP.create(otpPayload)
    // console.log("OTP generated");

    return res.status(200).json({
      success: true,
      message: "OTP generated succesfully.",
      otp: otp,
    })
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      succes: false,
      message: error.message,
    })
  }
}

exports.signUp = async (req, res) => {
  try {
    //data fetch from request ki body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body

    //validatION
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and ConfirmPassword must be same.",
      })
    }

    //check user already exist or not
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //    return res.status(400).json({
    //       success: false,
    //       message: 'User is already registered',
    //    });
    // }

    //find most recent OTP stored for the user
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)

    /* ❓❓ 🟩 YOU HAVE TO FIRST SEND THE OTP IF OTP IS sent then how can be there possibility that OTP is not found in the database.
      and about the unique user if I have already sent the otp int that function only i have performed validation.❓❓
      */

    //validate OTP

    if (recentOtp.length == 0) {
      //OTP not found
      return res.status(400).json({
        success: false,
        message: "OTP not Found. Genrate OTP first.",
        invalidOtp: true,
      })
    }
    if (otp != recentOtp[0].otp) {
      //Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
        invalidOtp: true,
      })
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    //entry create in DB

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    })
    //console.log(profileDetails._id)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      /** ❓❓❓❓ */
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${
        firstName + " " + lastName
      }`,
    })

    //return res
    return res.status(200).json({
      success: true,
      message: "User is registered Successfully",
      user,
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "User cannot be registrered. Please try again",
      error: error.message,
    })
  }
}

exports.logIn = async (req, res) => {
  try {
    //get data
    const { email, password } = req.body

    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill in both the email and password fields.",
      })
    }

    //User exist or not
    const user = await User.findOne({ email })
      .populate("additionalDetails")
      .populate("courses")

    if (!user) {
      return res.status(401).json({
        succes: false,
        message: "Please SignUp first.",
      })
    }

    //Decrypt password and compare with true password
    if (await bcrypt.compare(password, user.password)) {
      //password is correct so generate JWT token
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "3d",
      })

      user.token = token
      user.password = undefined

      //Generate cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
        httpOnly: true,
      }

      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged in succesfully",
      })
    }
    //Password is incorrect
    else {
      return res.status(403).json({
        succes: false,
        message: "Incorrect Password.",
      })
    }
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Login Failed, Try again.",
    })
  }
}

exports.changePassword = async (req, res) => {
  //change password can be used after login
  try {
    const { currentPassword, newPassword } = req.body
    const userID = req.user.id

    const user = await User.findById(userID)

    if (await bcrypt.compare(currentPassword, user.password)) {
      //password is correct so change password
      const hashedPassword = await bcrypt.hash(newPassword, 10)

      const updatedUser = await User.findByIdAndUpdate(
        userID,
        {
          password: hashedPassword,
        },
        { new: true }
      )

      // how can i change cookie
      res.clearCookie("token")

      const payload = {
        email: updatedUser.email,
        id: updatedUser._id,
        accountType: updatedUser.accountType,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "3d",
      })

      user.token = token
      user.password = undefined

      //Generate cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 12 * 3600 * 1000),
        httpOnly: true,
      }

      // Send notification email
      try {
        const emailResponse = await mailSender(
          updatedUser.email,
          "Password Updataed Succesfully.",
          passwordUpdated(
            updatedUser.email,
            `${updatedUser.firstName} ${updatedUser.lastName}`
          )
        )
        //console.log("Email sent successfully:", emailResponse.response)
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }

      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Password changed succesfully. token has also changed",
        token,
        user,
      })
    }

    //Password is incorrect
    else {
      return res.status(401).json({
        succes: false,
        message: "Incorrect Password.",
      })
    }
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed to change password.",
    })
  }
}
