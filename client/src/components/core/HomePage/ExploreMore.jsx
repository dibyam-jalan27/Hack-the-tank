import React, { useState } from "react"
import { HomePageExplore as data } from "../../../data/homepage-explore"
import HighLightText from "./HighLightText"
import CourseCard from "./CourseCard"

const ExploreMore = () => {
  const [currTab, setCurrTab] = useState(data[0].tag)
  const [courses, setCourses] = useState(data[0].courses)
  const [currCard, setCurrCard] = useState(data[0].courses[0].heading)

  const setMyCards = (value) => {
    setCurrTab(value)
    const result = data.filter((ele) => ele.tag === value)
    setCourses(result[0].courses)
    setCurrCard(result[0].courses[0].heading)
  }
  return (
    <div className="flex translate-y-24 flex-col gap-4 font-inter ">
      <div className="first-letter text-center font-inter text-4xl font-semibold not-italic  leading-[2.75rem]">
        Unlock the
        <HighLightText text={" Power of Code"} />
      </div>

      <div className="mx-auto flex flex-col self-stretch text-center font-inter text-base font-medium text-richblack-300">
        Learn to Build Anything You Can Imagine
      </div>

      <div className="mx-auto mb-10 flex flex-wrap justify-center rounded-3xl border-richblack-100 bg-richblack-700 px-1 py-1 sm:flex-row">
        {data.map((ele, index) => {
          return (
            <div
              className={`flex items-center gap-2 text-[16px] 
                     ${
                       currTab === ele.tag
                         ? " bg-richblack-900 font-medium text-richblack-5 "
                         : " text-white "
                     } 
                       cursor-pointer rounded-full px-7 py-2 transition-all duration-200 hover:text-richblack-100`}
              key={index}
              onClick={() => {
                setMyCards(ele.tag)
              }}
            >
              {ele.tag}
            </div>
          )
        })}
      </div>

      <div className="flex flex-col items-center justify-center gap-9 px-14 md:flex-row">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              currCard={currCard}
              setCurrCard={setCurrCard}
              data={ele}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ExploreMore
