import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import RenderCourses from "./RenderCourses"
import IconBtn from "../../../common/IconButton"
import { useNavigate } from "react-router-dom"
import { buyCourse } from "../../../../services/operations/studentAPI"

const Cart = () => {
  const { totalItems, total, cart } = useSelector((state) => state.cart)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const handleBuyCourse = async () => {
    setLoading(true)
    let courseIds = []
    for (const course of cart) {
      courseIds.push(course._id)
    }
    //console.log(courseIds)
    buyCourse(token, courseIds, user, dispatch, navigate, false)

    setLoading(false)
  }
  return (
    <div>
      <h1 className="mb-5 text-3xl font-medium text-richblack-5">
        My Wishlist
      </h1>
      <p className="border-b border-richblack-400 py-2 text-sm font-medium text-richblack-400 ">{`${totalItems} Course(s) in Wishlist`}</p>

      {totalItems > 0 ? (
        <div className="flex w-full items-start justify-between">
          <RenderCourses />
          <div className="mt-6 flex max-h-fit min-w-max flex-col gap-2 rounded-lg border border-richblack-700 bg-richblack-800 p-6  ">
            <p className="text-sm font-semibold text-richblack-200 ">Total:</p>
            <p className="text-2xl font-semibold text-yellow-50">Rs. {total}</p>
            <IconBtn
              text={"Buy Now"}
              customClasses={"w-[84%] mx-auto justify-center min-w-fit"}
              onclick={handleBuyCourse}
              disabled={loading}
            />
          </div>
        </div>
      ) : (
        <p className="mt-10 py-2 text-center text-xl font-medium text-richblack-300">
          Wishlist Your Dream Courses
        </p>
      )}
    </div>
  )
}

export default Cart
