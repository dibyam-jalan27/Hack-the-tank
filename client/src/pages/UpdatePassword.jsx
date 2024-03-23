import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../components/common/Loader"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { resetPassword } from "../services/operations/authAPI"
import AuthButton from "../components/core/Auth/AuthButton"

export const UpdatePassword = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { newPassword, confirmNewPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(newPassword, confirmNewPassword, token, navigate))
  }

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center p-8">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-[30rem] flex-col justify-start gap-6 p-2 ">
          <h1 className="text-3xl font-semibold text-richblack-5">
            Choose new password
          </h1>
          <div className="text-lg font-normal text-richblack-100">
            Almost done. Enter your new password and youre all set.
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={handleOnChange}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[52%] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleOnChange}
                placeholder="Confirm New Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[52%] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <AuthButton classN="w-full">Reset Password</AuthButton>
          </form>
          <Link
            to={"/login"}
            className="flex items-center gap-2 self-stretch text-base font-medium text-richblack-5"
          >
            <MdOutlineKeyboardBackspace className="text-2xl " />
            Back to login
          </Link>
        </div>
      )}
    </div>
  )
}
