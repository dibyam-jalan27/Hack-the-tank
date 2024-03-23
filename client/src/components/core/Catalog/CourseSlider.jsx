import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
// import "swiper/css/pagination"

import { Navigation } from "swiper/modules"
import CourseCard from "./CourseCard"

const CourseSlider = ({ courses }) => {
  return (
    <>
      {courses?.length ? (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          slidesPerView={`${Math.max(4, courses.length % 3)}`}
          //  centeredSlides={true}
          spaceBetween={20}
          //  navigation={true}
          //  loop={true}
          //  modules={[Navigation]}
          //  className="mySwiper"
        >
          {courses.map((course, ind) => (
            <SwiperSlide key={ind}>
              <div className="flex">
                <CourseCard course={course} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
