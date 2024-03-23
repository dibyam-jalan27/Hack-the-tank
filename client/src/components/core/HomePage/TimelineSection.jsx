import React from "react"
import girl from "../../../assets/Images/TimelineImage.png"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import { TfiLineDotted } from "react-icons/tfi"
const data = [
  {
    logo: Logo1,
    heading: "Leadership",
    desc: "Fully committed to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    desc: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    desc: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    desc: "Code your way to a solution",
  },
]
const TimeLineSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[6%] lg1:flex-row lg1:items-start">
      <div className="mr-10 flex flex-col gap-6">
        {data.map((ele, index) => {
          return (
            <div
              className="relative flex flex-row items-center gap-6 px-3 py-4"
              key={index}
            >
              <div
                className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white"
                key={index}
              >
                <img src={ele.logo} alt="" />
              </div>

              <div className="flex flex-col">
                <div className="text-base font-semibold ">{ele.heading}</div>
                <div>{ele.desc}</div>
              </div>
              <TfiLineDotted className="absolute -bottom-9 left-[4.5%] h-10 w-10 rotate-90 text-richblack-100"></TfiLineDotted>
            </div>
          )
        })}
      </div>
      <div className="relative flex flex-col items-center lg1:w-[50%]">
        <img src={girl} alt=""></img>
        <div className="flex w-fit translate-y-[-50%] gap-14  bg-caribbeangreen-700 p-10">
          <div className="flex items-center justify-between gap-5 ">
            <div className="text-4xl font-bold text-white ">10</div>
            <div className="flex flex-col text-caribbeangreen-300">
              <p>YEARS</p>
              <p>EXPERIENCE</p>
            </div>
          </div>

          <div className="w-[0.0625rem] bg-[#037957]"></div>

          <div className="flex items-center justify-between gap-5 ">
            <div className="text-4xl font-bold text-white ">250</div>
            <div className="flex flex-col text-caribbeangreen-300">
              <p>TYPES OF</p>
              <p>COURSES</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineSection
