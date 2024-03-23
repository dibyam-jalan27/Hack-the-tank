import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changePassword } from "../../../../services/operations/settingsAPI"
import { useForm } from "react-hook-form"
import IconBtn from "../../../common/IconButton"
import { useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { setLoading } from "../../../../slices/profileSlice"

const inputStyle =
  "rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
const labelStyle = "text-[14px] text-richblack-5"

function ChangePassword() {
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showCurrPassword, setShowCurrPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const changePasswordHandler = (formData) => {
    dispatch(setLoading(true))
    changePassword(formData, token)
    dispatch(setLoading(false))
  }

  return (
    <form
      onSubmit={handleSubmit(changePasswordHandler)}
      className="flex w-full flex-col gap-5"
    >
      <div className="flex flex-col gap-5 rounded-lg border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-lg font-semibold text-richblack-5 ">Password</h2>
        <div className="flex w-full flex-col gap-6 md1:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="currentPassword" className={`${labelStyle}`}>
              Current Password
            </label>

            <div className="relative w-full">
              <input
                name="currentPassword"
                id="currentPassword"
                placeholder="Enter Current Password"
                type={showCurrPassword ? "text" : "password"}
                className={`${inputStyle} w-full`}
                {...register("currentPassword", { required: true })}
              />
              <span
                className="absolute right-3 top-[25%] z-[10] cursor-pointer"
                onClick={() => setShowCurrPassword((prev) => !prev)}
              >
                {showCurrPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>

            {errors.currentPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.currentPassword.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="newPassword" className={`${labelStyle}`}>
              New Password
            </label>

            <div className="relative w-full">
              <input
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                type={showNewPassword ? "text" : "password"}
                className={`${inputStyle} w-full`}
                {...register("newPassword", { required: true })}
              />
              <span
                className="absolute right-3 top-[25%] z-[10] cursor-pointer"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>

            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.newPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end gap-5">
        <button
          disabled={loading}
          onClick={() => {
            navigate("/dashboard/my-profile")
          }}
          className="rounded-lg bg-richblack-800 px-5 py-3 text-center text-base font-medium text-richblue-5 "
        >
          Cancel
        </button>
        <IconBtn type={"submit"} text={"Save"} disabled={loading} />
      </div>
    </form>
  )
}

export default ChangePassword
