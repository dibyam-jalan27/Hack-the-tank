import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteCourse,
  fetchInstructorCourses,
  getDetailsOfCourse,
} from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconButton"
import { VscAdd } from "react-icons/vsc"
import { BsCheckCircleFill, BsClockFill } from "react-icons/bs"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { MdEdit } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { setCourse, setEditCourse } from "../../../slices/courseSlice"
import { convertSecondstoTime } from "../../../utils/timeDurationFormatter"
import { Loader } from "../../common/Loader"
import toast from "react-hot-toast"

const MyCourses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  //   const { setEditCourse, setCourse } = useSelector((state) => state.course)
  const [courses, setCourses] = useState(null)
  const [loading, setLoading] = useState(false)

  const deleteCourseHandler = async (courseID) => {
    setLoading(true)
    try {
      await deleteCourse({ courseID }, token)
      const courseRes = await fetchInstructorCourses(token)
      setCourses(courseRes)
    } catch (error) {}
    setLoading(false)
  }
  const editCourseHandler = async (courseID, courseStatus) => {
    if (courseStatus === "Published") {
      toast.error("You cannot edit published course.")
      return
    }
    setLoading(true)
    const course = await getDetailsOfCourse(courseID, token)
    //console.log(course)
    dispatch(setEditCourse(true))
    dispatch(setCourse(course))
    navigate("/dashboard/add-course")
    setLoading(false)
  }

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetchInstructorCourses(token)
      setCourses(response)
    }
    fetchCourse()
  }, [token])
  return !courses ? (
    <Loader />
  ) : (
    <div className=" ">
      <div className="flex justify-between">
        <h1 className="mb-14 min-w-[320px] text-3xl font-medium text-richblack-5">
          My Courses
        </h1>
        <IconBtn
          onclick={() => {
            navigate("/dashboard/add-course")
          }}
          customClasses={"h-fit"}
          text={"Add Course"}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses.length ? (
        <div className="min-w-[410px] rounded-md border border-richblack-700 p-4">
          <table className="w-full table-auto ">
            <thead>
              <tr className="text-richblack-100">
                <th className="appearance-none text-left font-medium">
                  Courses
                </th>
                <th className="appearance-none pl-[8px] text-left font-medium">
                  Duration
                </th>
                <th className="appearance-none pl-[8px] text-left font-medium">
                  Price
                </th>
                <th className="appearance-none pl-[8px] text-left font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => {
                return (
                  <tr className="" key={course._id}>
                    <td onClick={()=>navigate(`/courses/${course._id}`)}  className="flex cursor-pointer flex-col 3md:flex-row gap-6 pt-[2rem]">
                      <img
                        src={course.thumbnail}
                        alt="course-thumbnail"
                        className="h-[54px] w-[96px] rounded-lg md:aspect-video md:h-fit md:w-[200px]"
                      />
                      <div className="flex flex-col gap-3">
                        <p className="text-xl font-semibold text-richblack-5">
                          {course.courseName}
                        </p>
                        <p className="hidden md:block overflow-hidden text-ellipsis  text-sm font-normal text-richblack-100">
                          {course.description.length>150?course.description.substring(0,150)+'...':course.description}
                        </p>
                        <p className=" text-sm font-medium text-richblack-25">
                          Created{" "}
                          {course?.createdAt.toLocaleString().split("T").at(0)}
                        </p>
                        <div
                          className={`flex w-fit items-center gap-[0.375rem] rounded-[12.5px] bg-richblack-700 px-2 py-[0.125rem] ${
                            course.status === "Published"
                              ? "text-yellow-100"
                              : "text-pink-100"
                          }`}
                        >
                          {course.status === "Published" ? (
                            <BsCheckCircleFill />
                          ) : (
                            <BsClockFill />
                          )}
                          <p>{course.status}</p>
                        </div>
                      </div>
                    </td>
                    <td className="pl-[8px] text-richblack-100 ">
                      {convertSecondstoTime(course.duration)}
                    </td>
                    <td className="pl-[8px] text-richblack-100 ">
                      ₹{course.price}
                    </td>
                    <td className="pl-[8px] text-richblack-100 ">
                      <div className="flex justify-evenly">
                        <button
                          disabled={loading}
                          onClick={() => {
                            editCourseHandler(course._id, course.status)
                          }}
                        >
                          <MdEdit className="text-xl " />
                        </button>
                        <button
                          disabled={loading}
                          onClick={() => {
                            deleteCourseHandler(course._id)
                          }}
                        >
                          <RiDeleteBin6Fill className="text-xl " />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-xl font-semibold text-richblack-5">
          No Course Created.
        </div>
      )}
    </div>
  )
}

export default MyCourses
