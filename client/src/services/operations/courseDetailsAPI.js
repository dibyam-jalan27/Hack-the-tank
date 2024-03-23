import { toast } from "react-hot-toast"

// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";

import {
  courseEndpoints,
  courseProgressEndpoints,
  ratingsEndpoints,
} from "../apis"
import { apiConnector } from "../apiConnector"
const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  GET_USER_ENROLLED_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS,
  GET_COURSE_DETAILS,
  CREATE_RATING_API,
} = courseEndpoints

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    //console.log("GET_ALL_COURSE_API API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    })
    //  console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    //console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// fetching the available course categories
export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)
    //  console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    //console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  return result
}

// add the course details
export const addCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    //console.log(data)
    //  const response = await apiConnector("POST", CREATE_COURSE_API, data, {
    //    "Content-Type": "multipart/form-data",
    //    Authorization: `Bearer ${token}`,
    //  })
    const response = await apiConnector(
      "POST",
      CREATE_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      {}
    )
    //console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
    toast.success("Course Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    //console.log("CREATE COURSE API ERROR............", error)
    toast.error(error?.response?.data?.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    //console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    //console.log("EDIT COURSE API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    //console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.data
  } catch (error) {
    //console.log("CREATE SECTION API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a subsection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    //console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (error) {
    //console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    //console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    //console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    })
    //console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    //console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    //console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    //console.log("DELETE SECTION API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    //console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    //console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetch all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
  let result = []
  //   const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    //console.log("INSTRUCTOR COURSES API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data
  } catch (error) {
    //console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  //   toast.dismiss(toastId)
  return result
}

//fetch all courses enrolled by a student
export async function getUserEnrolledCourses(token) {
  //   const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response) {
      throw new Error(response.data.message)
    }

    //  toast.dismiss(toastId)
    return response.data
  } catch (error) {
    //console.log("GET_USER_ENROLLED_COURSES_API error..........", error)
    toast.error(
      error?.response?.data?.message || "Something went wrong please try again."
    )
  }
  //   toast.dismiss(toastId)
}

// delete a course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    //  console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    //  console.log("DELETE COURSE API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
}

export const getDetailsOfCourse = async (courseID, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_COURSE_DETAILS,
      {
        courseID,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    //  console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    //console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error?.response?.data
    //toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //dispatch(setLoading(false));
  return result
}

export const getFullDetailsOfCourse = async (courseID) => {
  //   const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS,
      {
        courseID,
      }
    )
    //console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    //console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  //   toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    //console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    //console.log("CREATE RATING API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return success
}
//get average rating of course
export const getAverageRating = async (courseId) => {
  let result = null
  try {
    const response = await apiConnector(
      "GET",
      ratingsEndpoints.GET_AVERAGE_RATING_API,
      {
        courseId: courseId,
      }
    )
    //console.log("GET AVERAGE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Get Rating")
    }
    result = response.data
  } catch (error) {
    //console.log("CREATE RATING API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  return result
}

export const getCourseProgress = async (courseId, token) => {
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      courseProgressEndpoints.GET_COURSE_PROGRESS_API,
      {
        courseId: courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    //console.log("GET API RESPONSE.../.........", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Get Progress")
    }
    result = response?.data?.data
  } catch (error) {
    //  console.log("CREATE API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  return result
}

// mark a lecture as complete
export const updateLectureStatus = async (data, token) => {
  let result = null
  //console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "POST",
      courseProgressEndpoints.UPDATE_SUBSECTION__STATUS_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    //console.log( "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",response)

    result = response?.data?.data
    //console.log(result)
    if (!response.data.success) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Status Updated.")
  } catch (error) {
    //console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}
