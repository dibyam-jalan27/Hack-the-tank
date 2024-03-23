import React, { useState } from "react"
import IconBtn from "../../common/IconButton"
import ReviewModal from "./ReviewModal"
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import { IoMdCheckboxOutline } from "react-icons/io"

const LectureBar = ({ course, setVideo, id, courseProgress }) => {
  const [modalData, setModalData] = useState(null)

  return (
   
    <div className="flex h-full flex-shrink-0 flex-col gap-3 bg-richblack-800 py-7">
      <div className="mx-6 flex flex-col gap-3 border-b border-richblack-600 pb-4">
        <p className="text-lg font-bold text-richblack-25">
          {course.courseName}
        </p>
        <IconBtn
          text={"Add Review"}
          customClasses={"w-fit h-[45%]"}
          onclick={() => {
            setModalData({
              btn2Handler: () => setModalData(null),
            })
          }}
        />
      </div>
      <div className="mt-4 border border-richblack-600">
        {course?.content.length &&
          course.content.map((section, ind) => (
            <details
              key={ind}
              className={`y  bg-richblack-700 ${ind !== 0 && "mt-2"}`}
            >
              <summary className="ysummary flex items-center justify-between gap-2 bg-richblack-700 px-4 py-2 text-sm font-medium">
                <div className="flex w-full justify-between">
                  <p className="text-richblack-5 ">{section.sectionName}</p>
                  <div className="2md:flex gap-2 hidden">
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
              <div className="flex flex-col gap-1 bg-richblack-800 pl-5 ">
                {section?.subSections.map((subSec, ind) => (
                  <div
                    key={ind}
                    onClick={() => setVideo(subSec)}
                    className={`flex cursor-pointer items-center gap-2 text-base ${
                      subSec._id === id
                        ? "text-[#47A5C5]"
                        : "text-richblack-400"
                    }  `}
                  >
                    {courseProgress?.completedVideos?.includes(subSec._id) ? (
                      <IoMdCheckboxOutline className="" />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank />
                    )}
                    <p>{subSec.title}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
      </div>
      {modalData && <ReviewModal modalData={modalData} />}
    </div>
  )
}

export default LectureBar
