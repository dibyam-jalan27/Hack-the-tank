import React from "react"
import { Link } from "react-router-dom"
import RatingStars from "../../common/RatingStars"

const CourseCard = ({ course }) => {
  return (
    <Link
      className="flex flex-col gap-3 pb-6 3md:pb-12"
      to={`/courses/${course._id}`}
    >
      <img
        src={course?.thumbnail}
        alt="course-thumbnail"
        className="rounded-lg "
      />
      <p className="text-base font-medium text-richblack-5">
        {course?.courseName}
      </p>
      <div className="flex flex-col  3md:justify-between 3md:flex-row">
        <RatingStars Rating={course?.avgRating} />
        <p className="text-richblack-400">
          {course.ratingAndReview.length} Review
          {course.ratingAndReview.length > 1 ? "s" : ""}
        </p>
      </div>
      <div className="flex flex-wrap gap-1 ">
        {course.tag.map((ele, ind) => {
          return (
            <div
              key={ind}
              className="mx-[1px] rounded-md bg-yellow-100 px-1 py-[1px] font-medium text-sm text-richblack-800"
            >
              {ele}
            </div>
          )
        })}
      </div>
      <p className="text-lg font-semibold text-richblack-5">
        Rs. {course?.price}
      </p>
    </Link>
  )
}

export default CourseCard
