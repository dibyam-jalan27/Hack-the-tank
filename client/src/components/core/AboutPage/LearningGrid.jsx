import React from "react"
import { LearningGridData } from "../../../data/aboutPageData"
import HighLightText from "../HomePage/HighLightText"
import CTAButton from "../../common/CTAButton"

const LearningGrid = () => {
  return (
    <section className="mb-10 grid min-w-[160px] grid-cols-1 bg-richblack-900 py-24 lg:w-auto lg:grid-cols-4 lg:px-32">
      {LearningGridData.map((ele, index) => {
        return (
          <div
            key={index}
            className={`mx-auto w-[50%] lg:w-full
                           ${index === 0 && "lg:col-span-2"}
                           ${
                             ele.order % 2 === 1
                               ? "bg-richblack-700 "
                               : "bg-richblack-800"
                           } 
                           ${ele.order === 3 && "lg:col-start-2"}
                        `}
          >
            {ele.order < 0 ? (
              <div className="ranslate-x-[-20%] mx-auto flex flex-col gap-6 bg-richblack-900 pb-10 lg:min-w-fit  lg:translate-x-0 lg:pb-0 lg:pr-[3.25rem] ">
                <h2 className="text-4xl font-semibold leading-[2.75rem]">
                  {ele.heading}
                  <HighLightText text={ele.highlightText} />
                </h2>
                <p>{ele.description}</p>
                <CTAButton active={true} linkto={ele.BtnLink}>
                  {ele.BtnText}
                </CTAButton>
              </div>
            ) : (
              <div className="mx-auto flex min-h-[250px] flex-col gap-8 p-8 lg:w-fit">
                <h2 className="text-lg font-semibold ring-richblack-5 ">
                  {ele.heading}
                </h2>
                <p className="text-sm font-normal ring-richblack-100">
                  {ele.description}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}

export default LearningGrid
