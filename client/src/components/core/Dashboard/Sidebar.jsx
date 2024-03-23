import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sidebarLinks } from "../../../data/dashboard-links"
import SidebarLink from "./SidebarLink"
import ConfirmationModal from "../../common/ConfirmationModal"
import { useNavigate } from "react-router-dom"
import { logout } from "../../../services/operations/authAPI"
import { VscSignOut } from "react-icons/vsc"

const Sidebar = () => {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  return (
    <div>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[180px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col gap-[0.625rem] text-richblack-200">
          {sidebarLinks.map((ele, index) => {
            if (ele.type && ele.type !== user?.accountType) {
              return null
            } else {
              return <SidebarLink link={ele} key={ele.id} />
            }
          })}
        </div>
        <div className="mx-auto my-5 h-[2px] w-[90%] bg-richblack-600 "></div>

        <div className="flex flex-col gap-[0.625rem] text-richblack-200">
          <SidebarLink
            link={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: "VscSettingsGear",
            }}
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure ?",
                text2: "You will be logged out of your Account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default Sidebar
