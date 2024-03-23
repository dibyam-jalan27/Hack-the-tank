const mongoose = require("mongoose")
const CourseProgress = require("../models/CourseProgress")
const OTP = require("../models/OTP")
const Profile = require("../models/Profile")
const RatingAndReview = require("../models/RatingAndReview")
const User = require("../models/User")
const { uploadMedia } = require("../utils/mediaUploader")
const { ACCOUNT_TYPE } = require("../utils/constants")
require("dotenv").config()
const fs = require("fs")
const { destroyMedia } = require("../utils/mediaDestroyer")

//profile is initialized with null details at the time of sign up so updation is needed instead od creation
exports.updateProfile = async (req, res) => {
  try {
    //get data
    const {
      firstName,
      lastName,
      profession,
      gender,
      dateOfBirth,
      about,
      contactNumber,
    } = req.body
    const userID = req.user.id

    if (!gender) {
      return res.status(400).json({
        success: false,
        message: "Fill in required details.",
      })
    }

    const userD = await User.findByIdAndUpdate(
      { _id: userID },
      {
        firstName: firstName,
        lastName: lastName,
      },
      { new: true }
    )

    const profileID = userD.additionalDetails

    const updatedProfile = await Profile.findByIdAndUpdate(
      profileID,
      {
        profession,
        gender,
        dateOfBirth,
        contactNumber,
        about,
      },
      { new: true }
    )

    const updatedUser = await User.findById(userD._id).populate(
      "additionalDetails"
    )

    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "Profile details updated Succesfully.",
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Profile details updation failed.",
    })
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    //get data
    const userID = req.user.id
    //validation
    const user = await User.findById(userID)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Account not found.",
      })
    }

    //delete profile entry
    await Profile.findByIdAndDelete(user.additionalDetails)
    //delete OTP
    await OTP.findOneAndDelete({ email: user.email })
    //delete Ratings and Reviwes
    await RatingAndReview.findOneAndDelete({ user: userID })
    //delete courseProgress
    await CourseProgress.findByIdAndDelete(user.courseProgress)

    //🟦🟥🟩🟦🟥🟩 is it necessery to delete user id from the course same answer as of deletion of sub section
    //🟦🟥🟩Schedule a request/Job/Task ==> chroneJob

    //delete user entry
    await User.findByIdAndDelete(userID)

    return res.status(200).json({
      success: true,
      message: "Account deleted Succesfully.",
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Account deletion failed.",
    })
  }
}

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()
    //console.log(userDetails)
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const userID = req.user.id
    const file = req.files.displayPicture

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File missing.",
      })
    }
    const oldeUser = await User.findById(userID)
    if (!oldeUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist.",
      })
    }
    const image = await uploadMedia(file, process.env.FOLDER_NAME, 1000, 1000)
    //  console.log(image)
    fs.readdir("./tmp", (err, files) => {
      if (err) console.log(err)
      else {
        files.forEach((file) => {
          fs.unlink(`./tmp/${file}`, (err) => {
            if (err) {
              throw err
            }
            //console.log("Delete File successfully.")
          })
        })
      }
    })

    if (oldeUser?.image.length > 4) {
      const destroyRes = await destroyMedia(oldeUser.image)
      // console.log(destroyRes)
    }
    //   fs.rmdir("./tmp", (err) => {
    //     if (err) {
    //       throw err
    //     }
    //  console.log("Delete File successfully.")
    //   })

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userID },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedUser,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
