const mongoose = require("mongoose")
const CourseProgress = require("../models/CourseProgress")
const User = require("../models/User")
const Course = require("../models/Course")
const certificateTemplate = require("../mails/templates/certificateSent")
const { mailSender } = require("../utils/mailSender")

exports.toggleStatus = async (req, res) => {
  try {
    const userId = req.user.id
    const { courseId, subSectionId } = req.body

    if (!userId || !courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Details missing.",
      })
    }
    const user = await User.findById(userId).populate("courseProgress").exec()
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist.",
      })
    }

    const course = await Course.findById(courseId).populate("content").exec()

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course does not exist.",
      })
    }
    let courseProgress = []
    for (let ele of user.courseProgress) {
      if (ele.course.toString() === courseId) {
        courseProgress.push(ele)
      }
    }

    if (!courseProgress || courseProgress.length === 0) {
      const course = await Course.findById(courseId).populate("content").exec()
      let totalVideos = 0
      for (let ele of course.content) {
        totalVideos += ele.subSections.length
      }
      const document = await CourseProgress.create({
        course: courseId,
        completedVideos: [subSectionId],
        totalVideos,
      })

      await User.findByIdAndUpdate(userId, {
        $push: { courseProgress: document._id },
      })

      try {
        await mailSender(
          user.email,
          "Course Completion Succesfully.",
          certificateTemplate(
            `${user.firstName} ${user.lastName}`,
            course.courseName,
            course.learning
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

      return res.status(200).json({
        success: true,
        data: document,
        message: "Sub section stauts updated susccesfully.",
      })
    } else {
      let courseProg
      let x = false
      for (let ele of courseProgress[0].completedVideos) {
        if (ele == subSectionId) {
          x = true
          break
        }
      }
      if (!x)
        courseProg = await CourseProgress.findByIdAndUpdate(
          courseProgress[0]._id,
          {
            $push: { completedVideos: subSectionId },
          },
          { new: true }
        )
      else {
        courseProg = await CourseProgress.findByIdAndUpdate(
          courseProgress[0]._id,
          {
            $pull: { completedVideos: subSectionId },
          },
          { new: true }
        )
      }

      const map = new Map()
      for (let ele of courseProg) {
        map.set(
          ele.course,
          (ele.completedVideos.length / ele.totalVideos) * 100
        )
      }
      console.log(map.get(courseId))
      if (map.get(courseId) === 100) {
        console.log("Certificate sent to user:", user.email)
        try {
          await mailSender(
            user.email,
            "Course Completion Succesfully.",
            certificateTemplate(
              `${user.firstName} ${user.lastName}`,
              course.courseName,
              course.learning
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
      }

      return res.status(200).json({
        success: true,
        data: courseProg,
        message: "Sub section stauts updated susccesfully.",
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching course progress.",
    })
  }
}

exports.updateCertificate = async (req, res) => {
  try {
    const { userId, courseId } = req.body
    if (!userId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Details missing.",
      })
    }

    const user = await User.findById(userId).populate("courseProgress")
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist.",
      })
    }
    let courseProgress = {}

    for (let ele of user.courseProgress) {
      if (ele.course.toString() === courseId) {
        courseProgress = ele
      }
    }

    if (!courseProgress) {
      return res.status(400).json({
        success: false,
        message: "Course progress not found.",
      })
    }

    const updatedCourseProgress = await CourseProgress.findByIdAndUpdate(
      courseProgress._id,
      {
        certificate: true,
      },
      { new: true }
    )

    return res.status(200).json({
      success: true,
      data: updatedCourseProgress,
      message: "Certificate updated susccesfully.",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching course progress.",
    })
  }
}

exports.getCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id
    const { courseId } = req.body
    if (!userId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Details missing.",
      })
    }

    const user = await User.findById(userId).populate("courseProgress")
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist.",
      })
    }
    let courseProgress = {}

    for (let ele of user.courseProgress) {
      if (ele.course.toString() === courseId) {
        courseProgress = ele
      }
    }

    return res.status(200).json({
      success: true,
      data: courseProgress,
      message: "Course progress fetched susccesfully.",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching course progress.",
      error: error,
    })
  }
}
