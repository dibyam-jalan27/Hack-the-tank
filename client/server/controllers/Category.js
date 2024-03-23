const Category = require("../models/Category")
const mongoose = require("mongoose")

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" })
    }
    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    })
    //console.log(CategorysDetails)
    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    })
  }
}

exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find(
      {},
      { name: true, description: true }
    )
    res.status(200).json({
      success: true,
      data: allCategorys,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body

    const selectedCategory = await Category.findById(categoryId)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      //console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }


     // Get courses for other categories
    //  const categoriesExceptSelected = await Category.find({
    //    _id: { $ne: categoryId },
    //  })
    //    //.populate("courses");
    //    .populate({
    //      path: "courses",
    //      populate: {
    //        path: "ratingAndReview",
    //      },
    //    })
    //    .exec()

    //  let differentCourses = []

    //  for (const category of categoriesExceptSelected) {
    //    differentCourses.push(...category.courses)
    //  }

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        populate: {
          path: "ratingAndReview",
        },
      })
      .lean()
      .exec()

    let allCoursesRes = allCategories.flatMap((category) => category.courses)
    let allCourses = []
    for (let course of allCoursesRes) {
      if (course.status === "Published") allCourses.push(course)
    }
    let selectedCourses = [],
      differentCourses = []

    allCourses.forEach((course) => {
      let avg = 0
      course.ratingAndReview.forEach((ele) => {
        avg += ele.rating
      })
      course["avgRating"] =
        course.ratingAndReview.length === 0
          ? 0
          : avg / course.ratingAndReview.length

      if (course.category == categoryId) selectedCourses.push(course)
      else differentCourses.push(course)
    })

    const mostSellingCourses = allCourses

      //need to be checked 🟥🟩🟥🟩
      .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
      .slice(0, 10)

    res.status(200).json({
      success: true,
      selectedCourses: selectedCourses,
      differentCourses: differentCourses,
      mostSellingCourses: mostSellingCourses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
