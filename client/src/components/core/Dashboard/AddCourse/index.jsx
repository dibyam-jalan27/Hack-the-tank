import React from "react"
import RenderSteps from "./RenderSteps"

const AddCourse = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between lg:flex-row">
      <div className="w-full">
        <h1 className="mb-5 text-3xl font-medium text-richblack-5">
          Add Course
        </h1>
        <div className="py-10 pr-10">
          <RenderSteps />
        </div>
      </div>
      <div className="flex h-fit w-fit min-w-[340px] flex-col gap-4 rounded-lg border border-richblack-700 bg-richblack-800 p-5 text-richblack-5 lg:w-[50%]">
        <p className="text-lg font-semibold ">⚡Course Upload Tips</p>
        <ul className="flex flex-col gap-3 pl-5 text-xs/5 font-medium ">
          <li> ● Set the Course Price option or make it free.</li>
          <li> ● Standard size for the course thumbnail is 1024x576.</li>
          <li> ● Video section controls the course overview video.</li>
          <li> ● Course Builder is where you create & organize a course.</li>
          <li>
            {" "}
            ● The course can be saved as a draft and later can be published.
          </li>
          <li> ● Only draft courses are editable.</li>
          <li> ● Once you publish the course it cannot be edited.</li>
          {/* <li>
            {" "}
            ● Add Topics in the Course Builder section to create lessons,
            quizzes, and assignments.
          </li>
          <li>
            {" "}
            ● Information from the Additional Data section shows up on the
            course single page.
          </li>
          <li> ● Make Announcements to notify any important</li>
          <li> ● Notes to all enrolled students at once.</li> */}
        </ul>
      </div>
    </div>
  )
}

export default AddCourse
