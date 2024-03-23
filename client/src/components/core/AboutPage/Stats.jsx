import React from "react"
import { StatsData } from "../../../data/aboutPageData"

const Stats = () => {
  return (
    <section className="mx-auto grid w-full gap-5 bg-richblack-800 px-28 py-14 sm:grid-cols-4 sm:gap-3 sm:py-20">
      {StatsData.map((ele, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-3"
          >
            <p className="text-4xl font-bold text-richblack-5">{ele.count}</p>
            <p className="text-center text-base font-semibold text-richblack-500">
              {ele.label}
            </p>
          </div>
        )
      })}
    </section>
  )
}

export default Stats
