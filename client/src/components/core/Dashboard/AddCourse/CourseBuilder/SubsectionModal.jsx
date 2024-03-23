import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { useDispatch, useSelector } from "react-redux"
import { setCourse } from "../../../../../slices/courseSlice"
import UploadContent from "../UploadContent"
import { IoMdCloseCircle } from "react-icons/io"
import IconBtn from "../../../../common/IconButton"

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    if (edit || view) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureDescription", modalData.description)
    }
  }, [edit, view, setValue, modalData])

  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDescription !== modalData.description ||
      currentValues.lectureVideo !== null
    ) {
      return true
    }
    return false
  }
  const closeModal = () => {
    setModalData(null)
  }
  const onSubmitHandler = async (currentValues) => {
    if (view) return

    if (edit) {
      if (isFormUpdated()) {
        const formData = new FormData()
        formData.append("subSectionID", modalData._id)
        formData.append("sectionID", modalData.sectionID)
        formData.append("courseID", course._id)
        if (currentValues.lectureTitle !== modalData.title) {
          formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDescription !== modalData.description) {
          formData.append("description", currentValues.lectureDescription)
        }
        if (currentValues.lectureVideo !== null) {
          formData.append("video", currentValues.lectureVideo)
        }
        setLoading(true)
        const result = await updateSubSection(formData, token)
        if (result) {
          dispatch(setCourse(result))
        }
        //updation done so back to nested view/main site
        setLoading(false)
        setModalData(null)
        return
      } else {
        toast.error("No changes made to the form.")
        return
      }
    }

    //add subsection
    const formData = new FormData()
    formData.append("sectionID", modalData)
    formData.append("courseID", course._id)
    formData.append("title", currentValues.lectureTitle)
    formData.append("description", currentValues.lectureDescription)
    formData.append("video", currentValues.lectureVideo)

    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      dispatch(setCourse(result))
    }
    setLoading(false)

    //creation done so back to nested view/main site
    setModalData(null)
    return
  }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex w-11/12 max-w-[600px] flex-col gap-6 rounded-lg border border-richblack-400 bg-richblack-800 p-6"
      >
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-lg ">
            {add ? "Adding" : view ? "Viewing" : edit ? "Editing" : ""} Lecture
          </h2>
          <button onClick={closeModal} disabled={loading}>
            <IoMdCloseCircle className="text-2xl text-richblack-5" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <UploadContent
              name={"lectureVideo"}
              label={"Lecture Video"}
              register={register}
              video={true}
              viewData={view}
              editData={edit || view ? modalData.videoUrl : null}
              setValue={setValue}
              errors={errors}
            />
          </div>
          <div>
            <label htmlFor="lectureTitle" className="labelStyle">
              Lecture Title <sup className="text-pink-200">*</sup>{" "}
            </label>
            <input
              id="lectureTitle"
              name="lectureTitle"
              type="text"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="inputStyle w-full"
            />
            {errors.lectureTitle && (
              <span className="mt-2 text-[12px] text-yellow-100">
                This field is required.
              </span>
            )}
          </div>
          <div>
            <label htmlFor="lectureDescription" className="labelStyle">
              Lecture Description <sup className="text-pink-200">*</sup>{" "}
            </label>
            <textarea
              id="lectureDescription"
              name="lectureDescription"
              placeholder="Enter Lecture Description"
              {...register("lectureDescription", { required: true })}
              className="inputStyle min-h-[140px] w-full"
            />
            {errors.lectureDescription && (
              <span className="mt-2 text-[12px] text-yellow-100">
                This field is required.
              </span>
            )}
          </div>
        </div>
        {!view && (
          <div className="flex gap-6">
            <button
              onClick={closeModal}
              className={`flex w-fit cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-[20px] py-[8px] text-richblack-900`}
              disabled={loading}
            >
              Cancel
            </button>
            <IconBtn
              type={"submit"}
              className="w-fit"
              disabled={loading}
              text={add ? "Add" : edit ? "Edit" : ""}
            ></IconBtn>
          </div>
        )}
      </form>
    </div>
  )
}

export default SubSectionModal
