const Course = require("../models/Course")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { destroyMedia } = require("../utils/mediaDestroyer")

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseID } = req.body

    //get data
    if (!sectionName || !courseID) {
      return res.status(400).json({
        success: false,
        message: "Fill in all the details.",
      })
    }

    //create section
    const newSection = await Section.create({ sectionName })

    //add section to the course
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseID },
      {
        $push: {
          content: newSection._id,
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
      message: "Section created Succesfully.",
      data: updatedCourse,
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Section creation failed.",
    })
  }
}

exports.updateSection = async (req, res) => {
  try {
    //get data
    const { sectionName, sectionID, courseID } = req.body

    if (!sectionName || !sectionID) {
      return res.status(400).json({
        success: false,
        message: "Fill in all the details.",
      })
    }

    //update section

    const updatedSection = await Section.findByIdAndUpdate(
      sectionID,
      {
        sectionName: sectionName,
      },
      { new: true }
    )

    const updatedCourse = await Course.findById(courseID)
      .populate({
        path: "content",
        populate: {
          path: "subSections",
        },
      })
      .exec()
    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Section updated Succesfully.",
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Section updation failed.",
    })
  }
}

exports.deleteSection = async (req, res) => {
  try {
    //get data
    const { sectionID, courseID } = req.body

    if (!sectionID) {
      return res.status(400).json({
        success: false,
        message: "Section ID missing.",
      })
    }

    //delete section

    const deltedSection = await Section.findByIdAndDelete(sectionID)
    //🟦🟥🟩🟦🟥🟩 is it necessery to delete section id from the course => ans

    deltedSection?.subSections.map(async (ele) => {
      const subSec = await SubSection.findByIdAndDelete(ele)
      if (subSec?.videoUrl.length > 4) await destroyMedia(subSec.videoUrl)
    })
    let updatedCourse
    if (deltedSection) {
      updatedCourse = await Course.findByIdAndUpdate(
        courseID,
        {
          $inc: {
            duration: -1 * deltedSection.totalTimeDuration,
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
    } else {
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
      message: "Section deleted Succesfully.",
    })
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Section delation failed.",
    })
  }
}
