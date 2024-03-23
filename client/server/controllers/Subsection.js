const Course = require("../models/Course")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { destroyMedia } = require("../utils/mediaDestroyer")
const { uploadMedia } = require("../utils/mediaUploader")
require("dotenv").config()
const fs = require("fs")

exports.createSubSection = async (req, res) => {
  try {
    //get data
    const { title, description, sectionID, courseID } = req.body
    const { video } = req.files

    if (!title || !description || !video || !sectionID) {
      return res.status(400).json({
        success: false,
        message: "Fill in all the details.",
      })
    }

    const section = await Section.findById(sectionID)
    if (!section) {
      return res.status(500).json({
        success: false,
        message: "Section doesn't exist.",
      })
    }

    //upload video video to cloudinary
    const cloudVideo = await uploadMedia(video, process.env.FOLDER_NAME)
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

    const duration = Math.floor(cloudVideo.duration)

    const newSubSection = await SubSection.create({
      title, //title:title ? 🟩🟩,
      description,
      timeDuration: duration,
      videoUrl: cloudVideo.secure_url,
    })

    const updatedSection = await Section.findByIdAndUpdate(
      sectionID,
      {
        $push: {
          subSections: newSubSection._id,
        },
        $inc: {
          totalTimeDuration: duration,
        },
      },
      { new: true }
    )

    const updatedCourse = await Course.findByIdAndUpdate(
      courseID,
      {
        $inc: {
          duration: duration,
        },
      },
      { new: true }
    )
      .populate({
        path: "content",
        populate: {
          path: "subSections",
        },
      })
      .exec()

    return res.status(200).json({
      success: true,
      message: "SubSection created Succesfully.",
      data: updatedCourse,
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "SubSection creation failed.",
    })
  }
}

//update SubSection
exports.updateSubSection = async (req, res) => {
  try {
    //get data
    const { title, description, sectionID, subSectionID, courseID } = req.body
    const video = req?.files?.video

    if (!courseID || !subSectionID || !sectionID) {
      return res.status(400).json({
        success: false,
        message: "Course id or subsection id missing.",
      })
    }
    if (!title && !description && !video) {
      return res.status(400).json({
        success: false,
        message: "No parameters.",
      })
    }

    const options = {}
    if (title) {
      options.title = title
    }

    if (description) {
      options.description = description
    }

    //upload new video
    let duration = 0
    if (video) {
      const cloudVideo = await uploadMedia(video, process.env.FOLDER_NAME)
      duration = Math.floor(cloudVideo.duration)
      options.videoUrl = cloudVideo.secure_url
      options.timeDuration = duration
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

    //update subsection and get old subsection
    const oldSubSection = await SubSection.findByIdAndUpdate(
      subSectionID,
      options
    )
    let updatedCourse
    //if video is uploaded then total time duration will change
    if (video) {
      if (oldSubSection?.videoUrl.length > 4)
        await destroyMedia(oldSubSection.videoUrl)
      const updatedSection = await Section.findByIdAndUpdate(
        sectionID,
        {
          $inc: {
            totalTimeDuration: duration - oldSubSection.timeDuration,
          },
        },
        { new: true }
      )
      updatedCourse = await Course.findByIdAndUpdate(
        courseID,
        {
          $inc: {
            duration: duration - oldSubSection.timeDuration,
          },
        },
        { new: true }
      )
        .populate({
          path: "content",
          populate: {
            path: "subSections",
          },
        })
        .exec()
    }

    //get updated course
    else {
      updatedCourse = await Course.findById(courseID)
        .populate({
          path: "content",
          populate: {
            path: "subSections",
          },
        })
        .exec()
    }
    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "SubSection updated Succesfully.",
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "SubSection updation failed.",
    })
  }
}

//delete SubSection
exports.deleteSubSection = async (req, res) => {
  try {
    //get data
    const { subSectionID, sectionID, courseID } = req.body

    if (!subSectionID) {
      return res.status(400).json({
        success: false,
        message: "Section ID missing.",
      })
    }

    //delete section

    const oldSubSection = await SubSection.findByIdAndDelete(subSectionID)
    //🟦🟥🟩🟦🟥🟩 is it necessery to delete SubSection id from the Section => You can leave the document as is, even when the referenced person document is deleted. Mongodb clears references which point to non-existing documents, this doesn't happen immediately after deleting the referenced document. Instead, when you perform action on the document, e.g., update. Moreover, even if you query the database before the references are cleared, the return is empty, instead of null value.

    if (oldSubSection?.videoUrl.length > 4) {
      await destroyMedia(oldSubSection.videoUrl)
    }
    let updatedCourse
    //decrease timeduration from section
    if (oldSubSection) {
      const updatedSection = await Section.findByIdAndUpdate(
        sectionID,
        {
          $inc: {
            totalTimeDuration: -1 * oldSubSection.timeDuration,
          },
        },
        { new: true }
      )
      updatedCourse = await Course.findByIdAndUpdate(
        courseID,
        {
          $inc: {
            duration: -1 * oldSubSection.timeDuration,
          },
        },
        { new: true }
      )
        .populate({
          path: "content",
          populate: {
            path: "subSections",
          },
        })
        .exec()
    }
    //return updated course
    else {
      updatedCourse = await Course.findById(courseID)
        .populate({
          path: "content",
          populate: {
            path: "subSections",
          },
        })
        .exec()
    }
    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "SUbSection deleted Succesfully.",
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "SUbSection delation failed.",
    })
  }
}
