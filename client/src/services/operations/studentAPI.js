import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints, studentEndpoints } from "../apis"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../slices/cartSlice"

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src

    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export async function buyCourse(
  token,
  courseIds,
  userDetails,
  dispatch,
  navigate,
  isDirect = true
) {
  const toastId = toast.loading("Loading...")
  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    //console.log("Script Loaded")
    if (!res) {
      toast.error("Failed to load RazorPay SDK.")
      toast.dismiss(toastId)
      return
    }
    //console.log(studentEndpoints.COURSE_PAYMENT_API)
    //Initiate order
    const orderResponse = await apiConnector(
      "POST",
      studentEndpoints.COURSE_PAYMENT_API,
      { courseIds: courseIds },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!orderResponse) {
      throw new Error(orderResponse.data.message)
    }

    if (!orderResponse.data.success) {
      toast.dismiss(toastId)
      toast.error(orderResponse.data.message)
      return
    }
    //console.log(process.env.RAZORPAY_KEY)
    //console.log(orderResponse)
    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.paymentResponse.currency,
      amount: `${orderResponse.data.paymentResponse.amount}`,
      order_id: orderResponse.data.paymentResponse.id,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: userDetails.firstName,
        email: userDetails.email,
      },
      handler: function (response) {
        //console.log("Call Back")
        //send successful wala mail
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.paymentResponse.amount,
          token,
          userDetails.firstName
        )
        //verifyPayment
        verifyPayment(
          { ...response, courseIds },
          token,
          navigate,
          dispatch,
          isDirect
        )
      },
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed")
      //console.log(response.error)
    })
  } catch (error) {
    //console.log("PAYMENT API ERROR.....", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch, isDirect) {
  const toastId = toast.loading("Verifying Payment....")
  //   dispatch(setPaymentLoading(true))

  try {
    const response = await apiConnector(
      "POST",
      studentEndpoints.COURSE_VERIFY_PAYMENT_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Payment successfull, you are addded to the course.")
    navigate("/dashboard/enrolled-courses")
    if (!isDirect) dispatch(resetCart())
  } catch (error) {
    //console.log("PAYMENT VERIFY ERROR....", error)
    toast.error("Could not verify Payment")
  }
  toast.dismiss(toastId)
  //   dispatch(setPaymentLoading(false))
}

async function sendPaymentSuccessEmail(response, amount, token, userName) {
  try {
    await apiConnector(
      "POST",
      studentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
        userName,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
  } catch (error) {
    //console.log("PAYMENT SUCCESS EMAIL ERROR....", error)
  }
}

export async function createRating(token, body) {
  const toastId = toast.loading
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.CREATE_RATING_API,
      body,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Rating and review added successfully.")
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
  toast.dismiss(toastId)
}
