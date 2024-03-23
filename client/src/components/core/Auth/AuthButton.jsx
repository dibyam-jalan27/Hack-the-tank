import React from "react"

const AuthButton = ({ children, classN, handlerFun }) => {
  return (
    <button
      onClick={handlerFun}
      className={`${classN} flex w-fit items-center justify-center rounded-lg bg-yellow-50 px-6 py-3 font-inter text-lg
  font-medium text-richblack-800 transition-all duration-200 hover:scale-95`}
      style={{ boxShadow: `-3px -3px 0px 0px rgba(255, 255, 255, 0.51) inset` }}
    >
      {children}
    </button>
  )
}

export default AuthButton
