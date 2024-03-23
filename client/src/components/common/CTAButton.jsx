import React from "react"
import { Link } from "react-router-dom"

const CTAButton = ({ children, active, linkto, classN }) => {
  return (
    <Link to={linkto}>
      <div
        className={`${classN} flex w-fit items-center rounded-lg px-6 py-3 text-center font-inter text-lg font-medium
            ${
              active
                ? "bg-yellow-50 text-richblack-800"
                : "bg-richblack-800 text-white"
            }
            transition-all duration-200 hover:scale-95`}
        style={{
          boxShadow: `-3px -3px 0px 0px rgba(255, 255, 255, ${
            active ? 0.51 : 0.18
          }) inset`,
        }}
      >
        {children}
      </div>
    </Link>
  )
}

export default CTAButton
