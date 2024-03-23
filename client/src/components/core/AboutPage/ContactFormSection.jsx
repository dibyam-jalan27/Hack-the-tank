import React from "react"
import ContactUsForm from "../../common/ContactUsForm"

const ContactFormSection = () => {
  return (
    <div className="flex flex-col items-center gap-4 pb-32">
      <h2 className="text-center text-4xl font-semibold leading-[2.75rem]">
        Get in Touch
      </h2>
      <p className="self-stretch text-center font-inter text-base font-medium text-richblack-300 ">
        We&apos; d love to here for you, Please fill out this form.
      </p>
      <ContactUsForm customWidth={" max-w-[460px]  min-w-[400px]"} />
    </div>
  )
}

export default ContactFormSection
