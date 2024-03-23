import React from "react"
import HighLightText from "./HighLightText"
import progress from "../../../assets/Images/Know_your_progress.svg"
import compare from "../../../assets/Images/Compare_with_others.svg"
import plan from "../../../assets/Images/Plan_your_lessons.svg"

const LLSection = () => {
  return (
    <div className="flex flex-col lg1:gap-14 ">
      <div className="mx-auto flex w-[80%] flex-col items-center justify-center gap-4">
        <div className="first-letter text-center font-inter text-4xl font-semibold not-italic  leading-[2.75rem]">
          Your swiss knife for learning any language
          <HighLightText text={" Coding Skills"} />
        </div>
        <div className="mx-auto flex w-[70%] flex-col self-stretch text-center font-inter text-base font-medium text-richblack-500">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center justify-center lg1:ml-10 lg1:w-full lg1:flex-row lg1:justify-evenly ">
        <img
          className="-z-1 translate-y-8 lg1:-translate-y-10 lg1:translate-x-28  "
          src={progress}
          alt=""
        />
        <img className="z-0  lg1:-translate-y-8" src={compare} alt="" />
        <img
          className="z-10 -translate-y-12  lg1:-translate-x-44 lg1:-translate-y-8 "
          src={plan}
          alt=""
        />
      </div>
    </div>
  )
}

export default LLSection
