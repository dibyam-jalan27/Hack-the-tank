import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { categories } from "../apis"

export const getCategoryData = async function (categoryId) {
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      categories.CATEGORYPAGEDATA_API,
      {
        categoryId: categoryId,
      }
    )
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.error(error)
    toast.error(error.response.data.message)
    result = {}
  }
  return result
}
