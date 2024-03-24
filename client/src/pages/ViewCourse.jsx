import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr"
import {
  getCourseProgress,
  getDetailsOfCourse,
  getUserEnrolledCourses,
  updateLectureStatus,
} from "../services/operations/courseDetailsAPI"
import { Loader } from "../components/common/Loader"
import LectureBar from "../components/core/ViewCourse/LectureBar"
import {
  BigPlayButton,
  ControlBar,
  ForwardControl,
  LoadingSpinner,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  VolumeMenuButton,
} from "video-react"
import { useSelector } from "react-redux"
import IconBtn from "../components/common/IconButton"
import axios from "axios"
import { courseEndpoints } from "../services/apis"

const ViewCourse = () => {
  const [video, setVideo] = useState(null)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(false)
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [courseProg, setcourseProg] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    async function fetchCourseDetails() {
      const courseRes = await getDetailsOfCourse(courseId, token)

      if (courseRes) {
        setCourse(courseRes)
        if (courseRes?.content[0]?.subSections.length > 0)
          setVideo(courseRes?.content[0]?.subSections[0])
      }
      const courseProgress = await getCourseProgress(courseRes._id, token)
      if (courseProgress) setcourseProg(courseProgress)
      const response = await getUserEnrolledCourses(token)
      const map = new Map()
      for (let ele of response.courseProgress) {
        map.set(
          ele.course,
          (ele.completedVideos.length / ele.totalVideos) * 100
        )
      }
      setProgress(map)
    }
    fetchCourseDetails()
  }, [courseId, token])

  console.log(progress.get(course._id))

  useEffect(() => {
    if (progress.get(course._id) === 100 && !courseProg?.certificate) {
      axios
        .post(
          courseEndpoints.GET_COURSE_CERTIFICATE_API,
          { courseID: course._id, userID: user._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data)
        })

      axios.post(
        courseEndpoints.UPDATE_COURSE_CERTIFICATE_API,
        { courseID: course._id, userID: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    }
  }, [courseProg, course, progress, token, user._id])

  useEffect(() => {}, [])
  const handleLectureCompletion = async () => {
    setLoading(true)
    const courseProgress = await updateLectureStatus(
      { courseId: course._id, subSectionId: video._id },
      token
    )
    setLoading(false)
    setcourseProg(courseProgress)
  }
  const findIndex = () => {
    for (let i = 0; i < course.content.length; i++) {
      let subSections = course.content[i].subSections
      for (let j = 0; j < subSections.length; j++) {
        if (subSections[j]._id === video._id) {
          return { i, j }
        }
      }
    }
  }

  const handleNext = () => {
    const { i, j } = findIndex()

    if (course.content[i].subSections.length - 1 <= j) {
      setVideo(course.content[i + 1].subSections[0])
    } else setVideo(course.content[i].subSections[j + 1])
  }
  const handlePrevious = () => {
    const { i, j } = findIndex()
    if (j <= 0) {
      setVideo(course.content[i - 1].subSections.at(-1))
    } else setVideo(course.content[i].subSections[j - 1])
  }

  const isLast = () => {
    const { i, j } = findIndex()
    if (
      i >= course.content.length - 1 &&
      j >= course.content[i].subSections.length - 1
    ) {
      return true
    } else return false
  }
  const isFirst = () => {
    const { i, j } = findIndex()
    if (i === 0 && j === 0) {
      return true
    } else return false
  }
  return !course || !courseProg ? (
    <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
      <Loader />
    </div>
  ) : (
    <div className="flex min-h-[calc(100vh-3.5rem)] min-w-[400px]  flex-col sm1:flex-row">
      <div className="min-w-[250px]">
        <LectureBar
          course={course}
          setVideo={setVideo}
          id={video._id}
          courseProgress={courseProg}
        />
      </div>
      <div className="flex w-full flex-col gap-5 px-6 pb-6">
        <div className="flex w-full flex-row-reverse justify-between pt-4 ">
          <IconBtn
            text={
              !courseProg?.completedVideos?.includes(video?._id)
                ? "Mark lecture as watched"
                : "Mark lecture as unwatched."
            }
            onclick={handleLectureCompletion}
            disabled={loading}
          />

          <div className="flex gap-4 ">
            {!isFirst() && (
              <button
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-200 px-[20px] py-[8px] text-richblack-900"
                disabled={loading}
                onClick={handlePrevious}
              >
                <GrLinkPrevious /> Prev
              </button>
            )}
            {!isLast() && (
              <IconBtn text={"Next"} disabled={loading} onclick={handleNext}>
                <GrLinkNext />
              </IconBtn>
            )}
          </div>
        </div>
        <Player
          key={video.videoUrl}
          aspectRatio="16:9"
          fluid={true}
          //  height={500}
        >
          <LoadingSpinner />
          <BigPlayButton position="center" />
          <source src={video.videoUrl} />
          <ControlBar
            autoHide={true}
            className="rounded-sm font-inter text-sm "
          >
            <VolumeMenuButton vertical />
            <PlaybackRateMenuButton order={7} rates={[5, 2, 1, 0.5, 0.1]} />
            <ForwardControl seconds={10} order={3} />
            <ReplayControl seconds={10} order={1} />
          </ControlBar>
        </Player>
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold text-richblack-5">
            {video.title}
          </p>
          <p className="max-w-[80%] text-sm font-medium text-richblack-50 ">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ViewCourse
