import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { buyCourse } from "../services/operations/studentAPI"
import { useDispatch, useSelector } from "react-redux"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import { Loader } from "../components/common/Loader"
import RatingStars from "../components/common/RatingStars"
import { PiInfoFill } from "react-icons/pi"
import { formateDate } from "../utils/dateFormatter"
import {
  convertSecondstoTime,
  convertSecondstoTimeWords,
} from "../utils/timeDurationFormatter"
import { MdOndemandVideo } from "react-icons/md"
import IconBtn from "../components/common/IconButton"
import { addToCart } from "../slices/cartSlice"
import ReviewSlider from "../components/common/ReviewSlider"

const CourseDetails = ({ isStudent }) => {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleBuyCourse = async () => {
    setLoading(true)
    buyCourse(token, [courseId], user, dispatch, navigate)
    setLoading(false)
  }

  const handleAddToCart = () => {
    dispatch(addToCart(course))
  }

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courseS = await getFullDetailsOfCourse(courseId)
      if (!courseS) return
      let avgRating = 0
      for (const rat of courseS.ratingAndReview) {
        avgRating += rat.rating
      }
      if (courseS.ratingAndReview.length !== 0)
        avgRating /= courseS.ratingAndReview.length

      courseS.avgRating = avgRating
      setCourse(courseS)
    }

    fetchCourseDetails()
  }, [courseId])

  //console.log(course)
  return !course ? (
   <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">

    <Loader />
   </div>
  ) : (
    <>
      <div className="flex items-start gap-2 bg-richblack-800 px-12 pt-2 text-richblack-300 lg:px-28">
        <p>Home</p>
        <p>/</p>
        <p>Catalog</p>
        <p>/</p>
        <p className="text-yellow-50">{course?.category.name}</p>
      </div>
      <div className="grid grid-cols-[minmax(500px,3fr),2fr] grid-rows-[minmax(100px,auto),auto] overflow-x-scroll  2md:overflow-x-auto">
        <div className="bg-richblack-800 py-5 pl-12 lg:pl-28">
          <div className="flex flex-col justify-center gap-3 border-r-2 border-richblack-700">
            <h1 className="text-4xl font-semibold leading-[2.75rem] text-richblack-5">
              {course.courseName}
            </h1>
            <p className="self-stretch pr-2 break-words text-base font-medium text-richblack-300">
              {course.description}
            </p>
            <div className="flex items-center justify-start gap-2 text-base font-normal text-richblack-25">
              <span>{course.avgRating}</span>
              <RatingStars Rating={course.avgRating} />
              <p>({course.ratingAndReview.length} Ratings)</p>
              <p>{course.studentsEnrolled.length} Students</p>
            </div>
            <p className="text-base font-normal text-richblack-25">
              Created By {course.instructor.firstName}{" "}
              {course.instructor.lastName}
            </p>
            <p className="flex items-center gap-3 text-base font-normal text-richblack-25">
              <PiInfoFill fill="#ffff00" />
              Created on {formateDate(course.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-end justify-center overflow-visible bg-richblack-800 pl-6 pr-12 lg:pr-28">
          <div className="max-w-[300px] rounded-t-md bg-richblack-700">
            <img
              src={course.thumbnail}
              alt="course-thumbnail"
              className=" rounded-t-md object-fill"
            />
            <p className="px-6 pt-6 text-3xl font-bold text-richblack-5 ">
              Rs. {course.price.toLocaleString("en-US")}
            </p>
          </div>
        </div>
        <div className="py-6 pl-12 lg:pl-28">
          <div className="flex flex-col gap-3 border border-richblack-700 p-4 ">
            <p className="text-2xl font-medium text-richblack-5 ">
              Benefits of learning this course 😍
            </p>
            <p className="text-sm font-medium text-richblack-50 ">
              {course.learning}
            </p>
          </div>
          <div className="pt-8">
            <p className="text-2xl font-medium text-richblack-5">
              Course Content
            </p>
            <p className="pt-2 text-sm font-normal text-richblack-300 ">
              {course.content.length} Section{course.content.length > 1 && "s"}{" "}
              ● {convertSecondstoTimeWords(course.duration)} Total Length
            </p>

            <div className="mt-4 border border-richblack-600">
              {course?.content.length &&
                course.content.map((section, ind) => (
                  <details
                    key={ind}
                    className="y border-b border-richblack-600 bg-richblack-700"
                  >
                    <summary className="ysummary flex items-center justify-between gap-2 bg-richblack-700 px-4 py-2 text-sm font-medium">
                      <div className="flex w-full justify-between">
                        <p className="text-richblack-5 ">
                          {section.sectionName}
                        </p>
                        <div className="flex gap-2">
                          <p className="text-yellow-50 ">
                            {section.subSections.length} Lecture
                            {section.subSections.length > 1 && "s"}
                          </p>
                          <p className="text-sm font-normal text-richblack-25">
                            {Math.ceil(section.totalTimeDuration / 60)} min
                          </p>
                        </div>
                      </div>
                    </summary>
                    {section?.subSections.map((subSec, ind) => (
                      <details key={ind} className="z bg-richblack-900 ">
                        <summary className="zsummary flex items-center  gap-2 px-8 pt-0">
                          <div className="flex w-full justify-between gap-2">
                            <div className="flex items-center gap-1">
                              <MdOndemandVideo className="text-xl text-richblack-50 " />
                              <p className="text-richblack-5 ">
                                {subSec.title}
                              </p>
                            </div>
                            <p className="text-sm font-normal text-richblack-25">
                              {convertSecondstoTime(subSec.timeDuration)}
                            </p>
                          </div>
                        </summary>
                        <p className="px-8 pb-2 text-sm font-normal text-richblack-50 ">
                          {subSec.description}
                        </p>
                      </details>
                    ))}
                  </details>
                ))}
            </div>
          </div>
        </div>
        <div className="flex min-w-[300px] justify-center pl-6 pr-12 lg:pr-28">
          <div className="h-fit w-full max-w-[300px] rounded-b-md bg-richblack-700 py-2 ">
            {isStudent && (
              <IconBtn
                text={"Buy Now"}
                customClasses={"w-[84%] mx-auto justify-center"}
                onclick={handleBuyCourse}
                disabled={loading}
              />
            )}
            {isStudent && (
              <button
                disabled={loading}
                className={`mx-auto mt-3 flex w-[84%] cursor-pointer items-center justify-center gap-x-2 rounded-md bg-richblack-800 px-[20px] py-[8px] text-richblack-5`}
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="px-12 py-5 lg:px-28">
        <p className="text-2xl font-medium text-richblack-5 ">Instructor</p>
        <div className="flex items-center gap-3 pt-2">
          <img
            src={course.instructor.image}
            alt="instructor"
            className="aspect-square w-14 rounded-full"
          />
          <p className="text-lg font-medium text-richblack-5 ">
            {course.instructor.firstName} {course.instructor.lastName}
          </p>
        </div>
      </div>
      {course?.ratingAndReview && course?.ratingAndReview.length>0 && <div className="px-12 py-5 lg:px-28">
        <p className="text-2xl font-medium text-richblack-5 ">
          Reviews from other learners
        </p>
        <ReviewSlider reviews={course?.ratingAndReview} />
      </div>}
    </>
  )
}

export default CourseDetails
