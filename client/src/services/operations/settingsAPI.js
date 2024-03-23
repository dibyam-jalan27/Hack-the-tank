import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
} = settingsEndpoints

export async function changePassword(formData, token) {
  setLoading(true)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    //console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    //console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  setLoading(false)
  toast.dismiss(toastId)
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      //console.log("DELETE_PROFILE_API response............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Succesfully.")
      dispatch(logout(navigate))
    } catch (error) {
      //console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    setLoading(false)
    toast.dismiss(toastId)
  }
}

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      //console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............",response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
    } catch (error) {
      //console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
    setLoading(false)
  }
}

export function updateProfile(token, formData) {
  const toastId = toast.loading("Loading...")
  return async (dispatch) => {
    setLoading(true)
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      //console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      response.data.data.image = userImage
      dispatch(setUser(response.data.data))
      toast.success("Profile Updated Successfully")
    } catch (error) {
      //console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    setLoading(false)
    toast.dismiss(toastId)
  }
}
