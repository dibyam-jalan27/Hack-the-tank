import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"
import { useForm } from "react-hook-form"
import IconBtn from "../../../../common/IconButton"
import { VscChevronRight, VscDiffAdded } from "react-icons/vsc"
import NestedView from "./NestedView"
import toast from "react-hot-toast"
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { Loader } from "../../../../common/Loader"

const CourseBuilderForm = () => {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [editSection, setEditSection] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const cancelEdit = () => {
    setEditSection(false)
    setValue("sectionName", "")
  }
  const goBack = () => {
    dispatch(setEditCourse(true))
    dispatch(setStep(1))
  }
  const goNext = () => {
    if (course?.content?.length === 0) {
      toast.error("Please add atleast one Section")
      return
    }
    if (course?.content.some((section) => section.subSections.length === 0)) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    //if everything is good
    dispatch(setStep(3))
  }
  const handleChangeEditSection = (sectionId, sectionName) => {
    if (editSection === sectionId) {
      cancelEdit()
      return
    }

    setEditSection(sectionId)
    setValue("sectionName", sectionName)
  }
  const onSubmit = async (data) => {
    setLoading(true)
    let result
    if (editSection) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionID: editSection,
          courseID: course._id,
        },
        token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseID: course._id,
        },
        token
      )
    }
    if (result) {
      dispatch(setCourse(result))
      setValue("sectionName", "")
    }
    setLoading(false)
  }
  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-[1.62rem] rounded-md border border-richblack-700 bg-richblack-800 p-6 text-richblack-5">
      <h2 className="text-xl font-semibold text-richblack-5 ">
        Course Builder
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[1.62rem]"
      >
        <div>
          <label htmlFor="sectionName" className="labelStyle">
            Section Name <sup className="text-pink-200">*</sup>{" "}
          </label>
          <input
            id="sectionName"
            name="sectionName"
            type="text"
            placeholder="Enter Section Name"
            {...register("sectionName", {
              required: true,
              validate: (value) => value !== null && value !== "",
            })}
            className="inputStyle w-full"
          />
          {errors.sectionName && (
            <span className="mt-2 text-[12px] text-yellow-100">
              This field is required.
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <IconBtn
            type={"submit"}
            text={editSection ? "Edit Section Name" : "Create Section"}
          >
            {!editSection && <VscDiffAdded className="text-xl font-black" />}
          </IconBtn>
          {editSection && (
            <button
              type="button"
              className="text-base underline"
              onClick={cancelEdit}
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {course?.content?.length > 0 && (
        <NestedView handleChangeEditSection={handleChangeEditSection} />
      )}
      <div className="flex flex-row gap-[1.62rem]">
        <button
          onClick={goBack}
          disabled={loading}
          className={`flex w-fit cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-[20px] py-[8px] text-richblack-900`}
        >
          Back
        </button>
        <IconBtn text={"Next"} onclick={goNext} customClasses={"w-fit"}>
          <VscChevronRight className="text-xl " />
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm
