import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../components/common/Loader"
import OTPInput, { ResendOTP } from "otp-input-react"
import { Link, useNavigate } from "react-router-dom"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import AuthButton from "../components/core/Auth/AuthButton"
import { sendOtp, signUp } from "../services/operations/authAPI"

export const VerifyEmail = () => {
  const { signupData, loading } = useSelector((state) => state.auth)
  const [OTP, setOTP] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (signupData === null) {
      navigate("/signup")
    }
  }, [navigate, signupData])

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = signupData
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        OTP,
        navigate
      )
    )
  }

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center p-8">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-[30rem] flex-col justify-start gap-6 p-2">
          <h1 className="text-3xl font-semibold text-richblack-5">
            Verify Email
          </h1>
          <div className="text-lg font-normal text-richblack-100">
            A verification code has been sent to you. Enter the code below.
          </div>

          <form className="flex flex-col gap-9" onSubmit={handleOnSubmit}>
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              placeholder={["-", "-", "-", "-", "-", "-"]}
              inputClassName="bg-richblack-700 text-richblack-100 font-medium text-2xl py-7 px-3 min-w-[50px] rounded-[0.5rem] focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:ring-offset-2 focus:ring-offset-richblack-800"
              className="texty outline-[#FFD60A] "
            />

            <AuthButton classN="w-full">Verify Email</AuthButton>
          </form>
          <ResendOTP
            onResendClick={() => sendOtp(signupData.email, navigate)}
            className="rounded-lg bg-richblack-700 p-3 text-richblack-5"
          />

          <div className="flex justify-between">
            <Link
              to={"/login"}
              className="flex items-center gap-2 self-stretch text-base font-medium text-richblack-5"
            >
              <MdOutlineKeyboardBackspace className="text-2xl " />
              Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
