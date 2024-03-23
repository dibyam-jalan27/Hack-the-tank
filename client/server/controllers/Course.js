const Course = require("../models/Course")
const Category = require("../models/Category")
const { uploadMedia } = require("../utils/mediaUploader")
const User = require("../models/User")
const { ACCOUNT_TYPE } = require("../utils/constants")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const RatingAndReview = require("../models/RatingAndReview")
const { destroyMedia } = require("../utils/mediaDestroyer")
const fs = require("fs")

exports.createCourse = async (req, res) => {
  try {
    //get data
    let {
      courseName,
      description,
      learning,
      price,
      categoryID,
      tag,
      instructions,
    } = req.body
    let { status } = req.body
    const { thumbnail } = req.files

    //validation
    if (
      !courseName ||
      !description ||
      !learning ||
      !price ||
      !categoryID ||
      !thumbnail ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "Fill in all the details.",
      })
    }

    if (!status || status === undefined) {
      status = "Draft"
    }

    const userId = req.user.id

    //instruction and problem in Tags 👻🟥👻🟦👻🟩

    const categoryD = await Category.findById(categoryID)
    if (!categoryD) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    const thumbnailImg = await uploadMedia(thumbnail, process.env.FOLDER_NAME)
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

    //create entry of course in DB

    const newCourse = await Course.create({
      courseName,
      description,
      instructor: userId,
      learning,
      price,
      category: categoryD._id,
      thumbnail: thumbnailImg.secure_url,
      tag: JSON.parse(tag), // (tag),
      status: status,
      instructions: JSON.parse(instructions),
    })

    //Add course id to instructor account
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    )

    //Update category
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryD._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    )

    return res.status(200).json({
      success: true,
      message: "Course Created Succesfully.",
      data: newCourse,
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Course creation failed.",
      error: error.message,
    })
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec()

    return res.status(200).json({
      success: true,
      message: "All Courses.",
      data: allCourses,
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed to get all courses.",
    })
  }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseID } = req.body

    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "course id missing.",
      })
    }

    const course = await Course.findById(courseID)
      .populate({
        path: "content",
        populate: {
          path: "subSections",
        },
      })
      .populate({
         path: "ratingAndReview",
         populate: {
           path: "user",
         },
       })
      .populate("instructor")
      .populate("category")
      .populate("studentsEnrolled")
      .exec()

    return res.status(200).json({
      success: true,
      message: "Course details",
      data: course,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get course detail.",
    })
  }
}

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseID } = req.body

    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "course id missing.",
      })
    }

    const course = await Course.findById(courseID)
      .populate({
        path: "content",
        populate: {
          path: "subSections",
        },
      })
      .exec()

    return res.status(200).json({
      success: true,
      message: "Course detail",
      data: course,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get course detail.",
    })
  }
}

exports.updateCourse = async (req, res) => {
  try {
    //get data
    let {
      courseID,
      courseName = null,
      description = null,
      learning = null,
      price = null,
      categoryID = null,
      tag = null,
      instructions = null,
    } = req.body
    if (!courseID) {
      return res.status(404).json({
        success: false,
        message: "Add course Id.",
      })
    }
    let { status } = req.body
    let thumbnail = null
    if (req.files !== null) {
      thumbnail = req.files.thumbnail
    }
    if (!status || status === undefined) {
      status = "Draft"
    }

    const userId = req.user.id
    //if we have to update category also then delete it from previous and then add this to new
    const course = await Course.findById(courseID)
    if (userId !== course.instructor.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can't edit this course.",
      })
    }

    if (categoryID) {
      var categoryD = await Category.findById(categoryID)
      if (!categoryD) {
        return res.status(404).json({
          success: false,
          message: "New Category Details Not Found",
        })
      }
      //delete from old category
      await Category.findByIdAndUpdate(course.category, {
        $pull: {
          courses: courseID,
        },
      })

      //add to new category
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryID,
        {
          $push: {
            courses: courseID,
          },
        },
        {
          new: true,
        }
      )
    }

    if (thumbnail != null) {
      await destroyMedia(course.thumbnail)
      var thumbnailImg = await uploadMedia(thumbnail, process.env.FOLDER_NAME)
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
    }
    //create entry of course in DB
    const update = {}
    if (courseName) update.courseName = courseName
    if (description) update.description = description
    if (learning) update.learning = learning
    if (price) update.price = price
    if (categoryID) update.category = categoryID
    if (thumbnail) update.thumbnail = thumbnailImg.secure_url
    if (tag) update.tag = JSON.parse(tag)
    if (status) update.status = status
    if (instructions) update.instructions = JSON.parse(instructions)

    const updatedCourse = await Course.findByIdAndUpdate(courseID, update, {
      new: true,
    })

    return res.status(200).json({
      success: true,
      message: "Course Updated Succesfully.",
      data: updatedCourse,
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Course updation failed.",
      error: error.message,
    })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    //get data
    let { courseID } = req.body
    const userId = req.user.id
    if (!courseID) {
      return res.status(404).json({
        success: false,
        message: "Add course Id.",
      })
    }

    const course = await Course.findByIdAndDelete(courseID)
    if (userId !== course.instructor.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can't delete this course.",
      })
    }
    await destroyMedia(course.thumbnail)
    for (let sectionId of course.content) {
      let section = await Section.findByIdAndDelete(sectionId)
      if (!section) continue
      for (let subSecId of section.subSections) {
        const subSec = await SubSection.findByIdAndDelete(subSecId)
        if (subSec?.videoUrl.length > 4) {
          await destroyMedia(subSec.videoUrl)
        }
      }
    }
    for (let ratingId of course.ratingAndReview) {
      await RatingAndReview.findByIdAndDelete(ratingId)
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted Succesfully.",
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Course deletion failed.",
      error: error.message,
    })
  }
}

exports.getInstructorCourses = async (req, res) => {
  try {
    const { id, accountType } = req.user
    if (accountType !== ACCOUNT_TYPE.INSTRUCTOR) {
      return res.status(401).json({
        success: false,
        message: "Restricted page. Only for Instructors",
      })
    }
    const user = await User.findById(id).populate("courses").exec()

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Could not find user",
      })
    }

    return res.status(200).json({
      success: true,
      data: user.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getEnrolledCourses = async (req, res) => {
  try {
    const { id, accountType } = req.user
    if (accountType !== ACCOUNT_TYPE.STUDENT) {
      return res.status(401).json({
        success: false,
        message: "Restricted page. Only for Instructors",
      })
    }
    const user = await User.findById(id)
      .populate("courses")
      .populate("courseProgress")
      .exec()

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${id}`,
      })
    }

    return res.status(200).json({
      success: true,
      courses: user.courses,
      courseProgress: user.courseProgress,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
