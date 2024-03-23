import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import CountryCode from "../../data/countrycode.json"
import { contactMailSender } from "../../services/operations/contactAPI"
import { Loader } from "./Loader"
import ContactButton from "../core/AboutPage/ContactButton"

const ContactUsForm = ({ customWidth }) => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  const submitContactForm = (data) => {
    contactMailSender(data, setLoading)
  }

  return loading === true ? (
    <Loader />
  ) : (
    <form
      className={`flex flex-col gap-7 ${customWidth}`}
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="firstName"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            className="rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("firstName", { required: true })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
          {errors.firstName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="lastName"
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            className="rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("lastName")}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >
          Email Address:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          {...register("email", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="phonenumber"
          className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >
          Phone Number
        </label>

        <div className="flex items-center gap-5">
          <div className="flex w-[150px] flex-col gap-2">
            <select
              type="text"
              name="countryCode"
              id="countryCode"
              placeholder="Country Code"
              defaultValue={"+91"}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              {...register("countryCode", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} - {ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-100px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 9, message: "Invalid Phone Number" },
              })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="5"
          placeholder="Enter your message here"
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          {...register("message", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <ContactButton>Send Message</ContactButton>
    </form>
  )
}

export default ContactUsForm
