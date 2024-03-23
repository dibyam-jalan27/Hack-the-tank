import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { Loader } from "../../../../common/Loader"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import RequirementField from "./RequirementField"
import ChipInput from "./ChipInput"
import UploadContent from "../UploadContent"
import IconBtn from "../../../../common/IconButton"
import { toast } from "react-hot-toast"
import { COURSE_STATUS } from "../../../../../utils/constants"
import { setCourse, setStep } from "../../../../../slices/courseSlice"

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        let categories = await fetchCourseCategories()
        setCategories(categories)
      } catch (error) {
        console.error("categories not fetched")
      }
      setLoading(false)
    }

    if (editCourse) {
      setValue("courseTitle", course["courseName"])
      setValue("courseShortDesc", course["description"])
      setValue("coursePrice", course["price"])
      setValue("courseTags", course["tag"])
      setValue("courseBenefits", course["learning"])
      setValue("courseCategory", course["category"])
      setValue("courseRequirements", course["instructions"])
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()

    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.description ||
      currentValues.coursePrice !== course.price ||
      JSON.stringify(currentValues.courseTags) !== JSON.stringify(course.tag) ||
      currentValues.courseBenefits !== course.learning ||
      currentValues.courseCategory !== course.category ||
      JSON.stringify(currentValues.courseRequirements) !==
        JSON.stringify(course.instructions) ||
      currentValues.courseImage !== null
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    if (editCourse) {
      // const currentValues = getValues()
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        formData.append("courseID", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.description) {
          formData.append("description", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (
          JSON.stringify(currentValues.courseTags) !==
          JSON.stringify(course.tag)
        ) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.learning) {
          formData.append("learning", data.courseBenefits)
        }
        if (currentValues.courseCategory !== course.category) {
          formData.append("categoryID", data.courseCategory)
        }
        if (
          JSON.stringify(currentValues.courseRequirements) !==
          JSON.stringify(course.instructions)
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== null) {
          formData.append("thumbnail", data.courseImage)
        }
        setLoading(true)
        const result = await editCourseDetails(formData, token)

        setLoading(false)
        if (result) {
          dispatch(setCourse(result))
          dispatch(setStep(2))
        }
      } else {
        toast.error("No changes made to the form.")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("description", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("learning", data.courseBenefits)
    formData.append("categoryID", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnail", data.courseImage)
    setLoading(true)
    //console.log(formData)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setCourse(result))
      dispatch(setStep(2))
    }
    setLoading(false)
  }
  return loading === true ? (
    <div className="flex h-full w-full items-center justify-center">
      <Loader />
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[1.62rem] rounded-md border border-richblack-700 bg-richblack-800 p-6 text-richblack-5"
    >
      <h2 className="text-xl font-semibold text-richblack-5 ">
        Course Information
      </h2>
      <div>
        <label htmlFor="courseTitle" className="labelStyle">
          Course Title <sup className="text-pink-200">*</sup>{" "}
        </label>
        <input
          id="courseTitle"
          name="courseTitle"
          type="text"
          autoComplete="off"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="inputStyle w-full"
        />
        {errors.courseTitle && (
          <span className="mt-2 text-[12px] text-yellow-100">
            This field is required.
          </span>
        )}
      </div>
      <div>
        <label htmlFor="courseShortDesc" className="labelStyle">
          Course Description <sup className="text-pink-200">*</sup>{" "}
        </label>
        <textarea
          id="courseShortDesc"
          name="courseShortDesc"
          placeholder="Enter Course Description"
          {...register("courseShortDesc", { required: true })}
          className="inputStyle min-h-[140px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="mt-2 text-[12px] text-yellow-100">
            This field is required.
          </span>
        )}
      </div>
      <div className="relative flex flex-col">
        <div className="relative flex flex-col">
          <label className="labelStyle">
            {" "}
            Course Price <sup className="text-pink-200">*</sup>{" "}
          </label>
          <input
            id="coursePrice"
            name="coursePrice"
            type="number"
            autoComplete="off"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              min: {
                value: 10,
                message: "Price must be greater or equal to 10 Rs.",
              },
            })}
            className="inputStyle w-1/2 pl-[7%]"
          />
          <HiOutlineCurrencyRupee className="absolute left-2 top-[50%] text-2xl" />
        </div>
        {errors.coursePrice && (
          <span className="mt-2 text-[12px] text-yellow-100">
            {errors.coursePrice.message || "This field is required."}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="coursecategory" className="labelStyle">
          Course Category <sup className="text-pink-200">*</sup>{" "}
        </label>
        <select
          id="courseCategory"
          name="courseCategory"
          {...register("courseCategory", { required: true })}
          className="inputStyle w-full"
        >
          <option value={""} disabled>
            Choose Course Category
          </option>
          {categories !== null &&
            categories.map((ele, ind) => (
              <option key={ele._id} value={ele._id}>
                {ele.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="mt-2 text-[12px] text-yellow-100">
            This field is required.
          </span>
        )}
      </div>

      <ChipInput
        name={"courseTags"}
        label={"Tags"}
        placeholder={"Enter Tags(s) (comma seperated)"}
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <UploadContent
        label={"Course Thumbnail"}
        name={"courseImage"}
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        video={false}
        editData={editCourse ? course.thumbnail : null}
      />
      <div>
        <label htmlFor="courseBenefits" className="labelStyle">
          Benefits Of The Course <sup className="text-pink-200">*</sup>{" "}
        </label>
        <textarea
          id="courseBenefits"
          name="courseBenefits"
          placeholder="Enter Benefits Of The Course "
          {...register("courseBenefits", { required: false })}
          className="inputStyle min-h-[140px] w-full"
        />
        {errors.courseBenefits && (
          <span className="mt-2 text-[12px] text-yellow-100">
            This field is required.
          </span>
        )}
      </div>
      <RequirementField
        register={register}
        errors={errors}
        name={"courseRequirements"}
        setValue={setValue}
        getValues={getValues}
        label={"Requirements/Instructions"}
        placeholder={"Enter Requirements for The Course"}
      />
      <div className="flex flex-row gap-[1.62rem]">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex w-fit cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-[20px] py-[8px] text-richblack-900`}
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          text={editCourse ? "Save Changes" : "Next"}
          type={"submit"}
          customClasses={"w-fit"}
        />
      </div>
    </form>
  )
}

export default CourseInformationForm
