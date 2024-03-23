import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { getPasswordResetToken } from "../services/operations/authAPI"
import { Loader } from "../components/common/Loader"
import AuthButton from "../components/core/Auth/AuthButton"

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth)
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState(null)
  const dispatch = useDispatch()

  const handleOnChange = (event) => {
    setEmail(event.target.value)
  }
  const handleOnSubmit = (event) => {
    event.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center p-8">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-[30rem] flex-col justify-start gap-9 p-2 ">
          <h1 className="text-3xl font-semibold text-richblack-5">
            {emailSent ? "Check email" : "Reset your password"}
          </h1>
          <div className="text-lg font-normal text-richblack-100">
            {emailSent ? (
              <div>
                We have sent the reset email to <br /> {email}
              </div>
            ) : (
              "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            )}
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required={true}
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
            )}

            {/* used for sending email onclick will sendemail ans if we are sending first time then set sendEmail to true*/}

            <AuthButton classN="w-full">
              {emailSent ? "Resend Email" : "Reset Password"}
            </AuthButton>
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

export default ForgotPassword
