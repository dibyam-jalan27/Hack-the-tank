import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { VscCloudUpload } from "react-icons/vsc"
import { Player } from "video-react"
import "video-react/dist/video-react.css"

const UploadContent = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = false,
  editData = null,
}) => {
  const [conFile, setConFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(editData ? editData : null)

  useEffect(() => {
    register(name, { required: editData ? false : true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  useEffect(() => {
    setValue(name, conFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conFile, setValue])

  const handelPreview = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    setConFile(file)
    handelPreview(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
  })

  return (
    <>
      <label htmlFor="courseBenefits" className="labelStyle">
        {label}
        <sup className="text-pink-200">*</sup>{" "}
      </label>
      <div className="rounded-lg border-4 border-dashed border-richblack-600 bg-richblack-700 p-2  placeholder:text-richblack-400 focus:outline-none">
        {previewSource === null ? (
          <div
            {...getRootProps()}
            className="flex w-full flex-col items-center p-6 "
          >
            <input {...getInputProps()} />
            {/* <p className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 placeholder:text-richblack-400 focus:outline-none border-dashed border-2 border-richblack-600'>Drag 'n' drop some files here, or click to select files</p> */}
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <VscCloudUpload className="text-2xl text-yellow-50" />
            </div>
            <p className="m-2 mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop {!video ? "an image" : "a video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc flex-row justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        ) : (
          <>
            {video ? (
              <Player aspectRatio="16:9" playsInline>
                <source src={previewSource}></source>
              </Player>
            ) : (
              <img
                src={previewSource}
                alt="Preview"
                className="aspect-video h-full w-full rounded-md object-cover"
              />
            )}
            {!viewData && (
              <button
                className="w-full text-center text-lg text-yellow-50"
                onClick={() => {
                  setPreviewSource(null)
                  setConFile(null)
                }}
              >
                Cancel
              </button>
            )}
          </>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-yellow-100">
          {label} is required
        </span>
      )}
      {!viewData && editData && !video && (
        <div>
          <p className="text-pink-200 ">Please Note :</p>
          <p className="text-yellow-50 ">
            1. If you dont want above image as thumbnail only then change it.
          </p>
          <p className="text-yellow-50">
            2. Make sure that after removing prev image, you add new one because
            if you don't then previous image will be displayed as a thumbnail.
          </p>
        </div>
      )}
      {!viewData && editData && video && (
        <div>
          <p className="text-pink-200 ">Please Note :</p>
          <p className="text-yellow-50 ">
            1. If you dont want above video as lecture only then change it.
          </p>
          <p className="text-yellow-50">
            2. Make sure that after removing prev video, you add new one because
            if you don't then previous video will be played as a lecture.
          </p>
        </div>
      )}
    </>
  )
}

export default UploadContent
