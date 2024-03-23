import React, { useEffect, useState } from "react"
import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactForm from "../components/core/ContactPage/ContactForm"
import ReviewSlider from "../components/common/ReviewSlider"
import { apiConnector } from "../services/apiConnector"
import { ratingsEndpoints } from "../services/apis"
const ContactUs = () => {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])
  return (
    <div>
      <div className="mx-auto mt-20 mb-10 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>

      {reviews?.length>0 && <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="mt-8 text-center text-4xl font-semibold">
          Reviews from other learners
        </h1>
        <ReviewSlider reviews={reviews} />
      </div>}
      <Footer />
    </div>
  )
}

export default ContactUs
