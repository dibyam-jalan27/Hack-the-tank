const Course = require("../models/Course")
const RatingAndReview = require("../models/RatingAndReview")
const mongoose = require("mongoose")

exports.createRatingAndReview = async (req, res) => {
  try {
    const { rating, review, courseId } = req.body
    const userID = req.user.id
    if (!rating || !review || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Add both review and rating.",
      })
    }

    //check student is enrolled or not
    const course = await Course.findOne({
      _id: courseId,
    })
    if (!course.studentsEnrolled.includes(userID)) {
      return res.status(404).json({
        success: false,
        message: "You are not enrolled in this course.",
      })
    }

    //check student has already rated or not
    const isRated = await RatingAndReview.findOne({
      user: userID,
      course: courseId,
    })

    if (isRated) {
      return res.status(403).json({
        success: false,
        message: "You have already rated this course.",
      })
    }

    //create
    const RandR = await RatingAndReview.create({
      user: userID,
      course: courseId,
      rating,
      review,
    })

    //add in the course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReview: RandR._id,
        },
      },
      { new: true }
    )
    return res.status(200).json({
      success: true,
      message: "RatingAndReview created Succesfully.",
      data: RandR,
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Rating/Review failed.",
    })
  }
}

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "course id is missing.",
      })
    }

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ])
    //console.log(result)
    //return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
        reviewCount: result[0].count,
      })
    }
    return res.status(200).json({
      success: true,
      message: "average rating",
      averageRating: averageRating,
      reviewCount: result.length,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getAllRatingAndReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image", // Specify the fields you want to populate from the "Profile" model
      })
      .populate({
        path: "course",
        select: "courseName", //Specify the fields you want to populate from the "Course" model
      })
      .exec()

    res.status(200).json({
      success: true,
      data: allReviews,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating and review for the course",
      error: error.message,
    })
  }
}
