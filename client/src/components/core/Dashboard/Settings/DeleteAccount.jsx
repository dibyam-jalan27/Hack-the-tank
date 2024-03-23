import React, { useState } from "react"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { deleteProfile } from "../../../../services/operations/settingsAPI"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../../common/ConfirmationModal"

const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.profile)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const deleteAccount = () => {
    dispatch(deleteProfile(token, navigate))
  }

  return (
    <div className="flex gap-5 rounded-lg border border-pink-700 bg-pink-900 p-6">
      <div className="flex h-fit w-fit items-center justify-center rounded-full bg-pink-700 p-3">
        <RiDeleteBin6Fill fill={"#EF476F"} className="h-6 w-6" />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-pink-5 ">Delete Account</h2>
        <div className="text-sm font-medium text-pink-25 ">
          <p>Would you like to delete account?</p>
          <p>
            This account contains Paid Courses. Deleting your account will
            remove all the contain associated with it.
          </p>
        </div>
        <button
          className="w-fit cursor-pointer text-base font-medium italic text-pink-300"
          onClick={() =>
            setConfirmationModal({
              text1: "Are You Sure ?",
              text2: "Your account & all the data associated with it will be deleted permanently.",
              btn1Text: "Delete",
              btn2Text: "Cancel",
              btn1Handler: deleteAccount,
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          disabled={loading}
        >
          I want to delete my account.
        </button>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default DeleteAccount
