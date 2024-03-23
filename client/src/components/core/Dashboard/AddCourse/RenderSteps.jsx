import React from "react"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import PublishCourse from "./PublishCourse"

const steps = [
  {
    id: 1,
    title: "Course Information",
  },
  {
    id: 2,
    title: "Course Builder",
  },
  {
    id: 3,
    title: "Publish",
  },
]

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course)

  return (
    <div className="min-w-[340px]">
      <div className="relative mb-2 flex min-w-[130px] justify-center transition-all duration-200">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center ">
              <div
                className={`grid aspect-square w-[45px] cursor-default place-items-center rounded-full border-[1px] text-xl ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </div>
            </div>
            {item.id !== steps.length && (
              <div
                className={`h-[calc(45px/2)] w-[33%]  border-b-2 border-dashed ${
                  step > item.id ? "border-yellow-50" : "border-richblack-500"
                } `}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative mb-16 flex w-full min-w-[130px] select-none justify-between">
        {steps.map((item) => (
          <div
            key={item.id}
            className="flex min-w-[130px] flex-col items-center gap-y-2"
          >
            <p
              className={`text-sm ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
      {/* </div> */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  )
}

export default RenderSteps
