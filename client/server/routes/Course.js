const express = require("express")

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getFullCourseDetails,
  getCourseDetails,
  getEnrolledCourses,
  getInstructorCourses,
} = require("../controllers/Course")
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")
const {
  updateSubSection,
  deleteSubSection,
  createSubSection,
} = require("../controllers/SubSection")
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category")
const {
  getAllRatingAndReview,
  getAverageRating,
  createRatingAndReview,
} = require("../controllers/RatingAndReview")
const router = express.Router()

router.get("")

// Importing Middlewares
const {
  auth,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middlewares/auth")
const {
  toggleStatus,
  getCourseProgress,
} = require("../controllers/CourseProgress")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Update a Course
router.post("/editCourse", auth, isInstructor, updateCourse)
//Delete a Course
router.delete("/deleteCourse", auth, isInstructor, deleteCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", getFullCourseDetails)
router.post("/getCourseDetails", getCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRatingAndReview)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingAndReview)

router.get("/getEnrolledCourses", auth, isStudent, getEnrolledCourses)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

router.post("/updateSubSecStatus", auth, isStudent, toggleStatus)
router.post("/getCourseProgress", auth, isStudent, getCourseProgress)

module.exports = router
