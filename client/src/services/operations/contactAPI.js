import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { contactusEndpoint } from "../apis"

export const contactMailSender = async (data, setLoading) => {
  const toastId = toast.loading("Loading...")
  setLoading(true)
  try {
    const response = await apiConnector(
      "POST",
      contactusEndpoint.CONTACT_US_API,
      data
    )

    //console.log("response", response)
    if (response.data.success) {
      toast.success(
        "Thank You for reaching out to us, we will get back to you shortly."
      )
    } else toast.error("Please Try Again...!!")
  } catch (error) {
    //console.log("Something went wrong...", error)
    toast.error("Something went wrong...")
  }
  setLoading(false)
  toast.dismiss(toastId)
}
