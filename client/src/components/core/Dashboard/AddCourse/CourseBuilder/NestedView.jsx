import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HiOutlineMenu } from "react-icons/hi"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { RxDividerVertical } from "react-icons/rx"
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { FaExpand, FaPlus } from "react-icons/fa"
import SubSectionModal from "./SubSectionModal"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import { setCourse } from "../../../../../slices/courseSlice"

const NestedView = ({ handleChangeEditSection }) => {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [editSubSection, setEditSubSection] = useState(false)
  const [addSubSection, setAddSubSection] = useState(false)
  const [viewSubSection, setViewSubSection] = useState(false)

  const [conformationModal, setConformationModal] = useState(null)

  const [loading, setLoading] = useState(false)

  const handleDeleteSection = async (id) => {
    setLoading(true)
    let result = await deleteSection(
      { sectionID: id, courseID: course._id },
      token
    )
    if (result) {
      dispatch(setCourse(result))
    }
    setConformationModal(null)
    setLoading(false)
  }

  const handleDeleteSubSection = async (subSectionID, sectionID) => {
    setLoading(true)
    let result = await deleteSubSection(
      { subSectionID, sectionID, courseID: course._id },
      token
    )
    if (result) {
      dispatch(setCourse(result))
    }
    setConformationModal(null)
    setLoading(false)
  }

  return (
    <div className="rounded-md border border-richblack-600 bg-richblack-700 px-6 ">
      {course?.content &&
        course?.content.map((section) => (
          <details
            key={section._id}
            className="x w-full py-3 text-base text-richblack-50"
          >
            <summary className="xsummary flex justify-between border-b border-b-richblack-600 pb-2 font-semibold ">
              <div className="flex w-full justify-between">
                <div className="flex items-center gap-3 ">
                  <HiOutlineMenu className="cursor-pointer text-xl" />
                  <p>{section.sectionName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={loading}
                    onClick={() =>
                      handleChangeEditSection(section._id, section.sectionName)
                    }
                  >
                    <MdEdit className="text-xl " />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConformationModal({
                        text1: "Delete this section?",
                        text2:
                          "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConformationModal(null),
                      })
                    }}
                  >
                    <RiDeleteBin6Fill className="text-lg " />
                  </button>
                  <RxDividerVertical className="text-2xl " />
                </div>
              </div>
            </summary>

            {section?.subSections &&
              section?.subSections.map((subSec) => (
                <div
                  key={subSec._id}
                  className="flex justify-between border-b border-b-richblack-600 py-2 pl-6"
                >
                  <div className="flex items-center gap-3 ">
                    <HiOutlineMenu className="text-xl" />
                    <p>{subSec.title}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      disabled={loading}
                      onClick={() => setViewSubSection(subSec)}
                    >
                      <FaExpand className="text-xl " />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() =>
                        setEditSubSection({ ...subSec, sectionID: section._id })
                      }
                    >
                      <MdEdit className="text-xl " />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConformationModal({
                          text1: "Delete this Sub Section?",
                          text2: "lecture in this section will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(subSec._id, section._id),
                          btn2Handler: () => setConformationModal(null),
                        })
                      }}
                    >
                      <RiDeleteBin6Fill className="text-lg " />
                    </button>
                  </div>
                </div>
              ))}
            <button
              disabled={loading}
              onClick={() => {
                setAddSubSection(section._id)
              }}
              className="flex items-center gap-3 text-yellow-50 "
            >
              <FaPlus />
              <p>Add Lecture</p>
            </button>
          </details>
        ))}

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
      {conformationModal && <ConfirmationModal modalData={conformationModal} />}
    </div>
  )
}

export default NestedView
