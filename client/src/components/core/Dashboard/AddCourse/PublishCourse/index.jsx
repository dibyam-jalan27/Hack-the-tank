import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../../common/IconButton"
import { VscChevronRight } from "react-icons/vsc"
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import toast from "react-hot-toast"

const PublishCourse = () => {
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const { register, getValues } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const goBack = () => {
    dispatch(setEditCourse(true))
    dispatch(setStep(2))
  }

  const onSubmit = async (data) => {
    if (!data.publish) {
      toast.error("To publish course check the checkbox!!!")
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append("courseID", course._id)
    formData.append("status", "Published")
    const response = await editCourseDetails(formData, token)
    //console.log(response)
    if (response?.status === "Published") {
      dispatch(setCourse(null))
      dispatch(setEditCourse(false))
      dispatch(setStep(1))
      navigate("/dashboard/my-courses")
    }
    setLoading(false)
  }
  const saveAsDraft = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("courseID", course._id)
    formData.append("status", "Draft")
    const response = await editCourseDetails(formData, token)
    //console.log(response)
    if (response?.status === "Draft") {
      dispatch(setCourse(null))
      dispatch(setEditCourse(false))
      dispatch(setStep(1))
      navigate("/dashboard/my-courses")
    }
    setLoading(false)
  }

  return (
    //  <div
    //    className="flex flex-col gap-[1.62rem] rounded-md border border-richblack-700 bg-richblack-800 p-6 text-richblack-5"
    //  >
    <div className="flex flex-col gap-[1.62rem] rounded-md border border-richblack-700 bg-richblack-800 p-6 text-richblack-5">
      <h2 className="text-xl font-semibold text-richblack-5 ">
        Publish Course
      </h2>

      <div className="flex gap-4">
        <input
          id="publish"
          name="publish"
          type="checkbox"
          autoComplete="off"
          placeholder="Enter Course Title"
          {...register("publish")}
          className="inputStyle h-4 w-4 cursor-pointer"
        />
        <label htmlFor="courseTitle" className="labelStyle w-f">
          Make This Course Public.{" "}
        </label>
      </div>

      <div className="flex flex-row gap-[1.62rem]">
        <button
          onClick={goBack}
          disabled={loading}
          className={`flex h-fit w-fit cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-[20px] py-[8px] text-richblack-900`}
        >
          Back
        </button>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => saveAsDraft()}
            disabled={loading}
            className={`flex w-fit cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-[20px] py-[8px] text-richblack-900`}
          >
            Save as Draft
          </button>
          <IconBtn
            text={"Publish Course"}
            customClasses={"w-fit"}
            disabled={loading}
            onclick={() => onSubmit(getValues())}
          >
            <VscChevronRight className="text-xl " />
          </IconBtn>
        </div>
      </div>
    </div>
    //  </div>
  )
}

export default PublishCourse
