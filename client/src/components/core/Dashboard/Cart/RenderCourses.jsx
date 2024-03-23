import React from "react"
import { useDispatch, useSelector } from "react-redux"
import RatingStars from "../../../common/RatingStars"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { removeFromCart } from "../../../../slices/cartSlice"

const RenderCourses = () => {
  const { cart, totalItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleRemoveCourse = (courseId) => {
    dispatch(removeFromCart(courseId))
  }

  return (
    <div className="flex flex-col py-6">
      {cart.map((course, index) => {
        return (
          <div
            className={`flex gap-5 border-richblack-700  px-6  ${
              index === 0 ? "pb-8" : "pt-8"
            } ${index < totalItems - 1 && "border-b-[0.0625rem]"}`}
            key={index}
          >
            <img
              className="w-48 rounded-lg "
              src={course?.thumbnail}
              alt="course_thumbnail"
            />

            <div>
              <p className="text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>
              <p className="text-base font-normal text-richblack-300 ">
                {course?.instructor.firstName} {course?.instructor.lastName}
              </p>

              <div className="flex items-center gap-1 text-base font-semibold text-richblack-25">
                <span>{course.avgRating}</span>
                <RatingStars Rating={course.avgRating} />
                <p>({course.ratingAndReview.length} Ratings)</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <button
                className="flex gap-2 rounded-lg bg-richblack-800 p-2 text-[#EF476F] "
                onClick={() => handleRemoveCourse(course._id)}
              >
                <RiDeleteBin6Fill fill={"#EF476F"} className="h-6 w-6" />
                <p>Remove</p>
              </button>
              <p className="pl-2 text-xl font-semibold text-yellow-50">
                Rs. {course.price}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RenderCourses
