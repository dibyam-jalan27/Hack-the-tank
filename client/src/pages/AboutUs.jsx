import React from "react"
import Footer from "../components/common/Footer"
import HighLightText from "../components/core/HomePage/HighLightText"
import img1 from "../assets/Images/aboutus1.webp"
import img2 from "../assets/Images/aboutus2.webp"
import img3 from "../assets/Images/aboutus3.webp"
import foundingImg from "../assets/Images/FoundingStory.png"
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa"
import Stats from "../components/core/AboutPage/Stats"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"

const AboutUs = () => {
  return (
    <div className="w-full text-white">
      <section className="flex flex-col items-center gap-8 bg-richblack-800 pt-14">
        <h1 className="text-base text-richblack-200 ">About us</h1>

        <div className="flex w-3/5 flex-col items-center gap-4 px-14 ">
          <p className="text-center text-4xl font-semibold leading-[2.75rem]">
            Driving Innovation in Online Education for a{" "}
            <HighLightText text={"Brighter Future"}></HighLightText>
          </p>

          <div className="self-stretch text-center font-inter text-base font-medium text-richblack-300 ">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </div>
        </div>

        <div className="relative flex translate-y-[60px] justify-center gap-6 ">
          <img src={img1} className="z-10 " alt="first" />
          <img src={img2} className="z-10" alt="second" />
          <img src={img3} className="z-10" alt="third" />
          <div
            className="absolute top-[-8px] z-[0] h-[19rem] w-[25rem] rounded-[23rem] opacity-50 blur-[34px]"
            style={{
              background: "linear-gradient(0deg, #8A2BE2 0%, #FFA500 50%)",
            }}
          ></div>
        </div>
      </section>
      <section className="m-32 flex justify-center ">
        <p className="flex min-w-[600px] text-center text-4xl font-semibold leading-[2.75rem]">
          <span>
            <FaQuoteLeft className="w-fit text-3xl" />
          </span>
          <span>
            We are passionate about revolutionizing the way we learn. Our
            innovative platform{" "}
            <HighLightText text={"combines technology"} bg={""} />,{" "}
            <HighLightText
              text={"expertise"}
              bg={"-webkit-linear-gradient(#FF512F, #F09819)"}
            />
            , and community to create{" "}
            <HighLightText
              text={"an unparalleled educational experience."}
              bg={"-webkit-linear-gradient(#E65C00, #F9D423)"}
            />
          </span>
          <span>
            <FaQuoteRight className="w-fit text-3xl" />
          </span>
        </p>
      </section>

      <section className="flex flex-col items-center justify-center gap-14 lg:flex-row lg:gap-24 lg:px-32 lg:py-20 ">
        <div className="flex flex-col gap-6 break-words px-8 lg:w-[50%] ">
          <p className="text-4xl font-semibold leading-[2.75rem]">
            <HighLightText
              text={"Our Founding Story"}
              bg={"-webkit-linear-gradient(#833AB4, #FD1D1D, #FCB045)"}
            />
          </p>
          <div className="flex flex-col gap-4 self-stretch font-inter text-base font-medium text-richblack-300 ">
            <p>
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>

            <p>
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
        </div>
        <img
          src={foundingImg}
          alt="founding_story"
          className="z-[10] shadow-[0_0_20px_0] shadow-[#FC6767] md:w-[50%]"
        />
      </section>

      <section className="flex flex-col items-center justify-center gap-14 px-14 py-20 lg:flex-row lg:gap-24 lg:px-32">
        <div className="flex flex-col gap-6 lg:w-[36%]">
          <p className="text-4xl font-semibold leading-[2.75rem]">
            <HighLightText
              text={"Our Vision"}
              bg={"-webkit-linear-gradient(#E65C00, #F9D423)"}
            />
          </p>
          <p className="flex flex-col gap-4 self-stretch font-inter text-base font-medium text-richblack-300 ">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:w-[36%]">
          <p className="text-4xl font-semibold leading-[2.75rem]">
            <HighLightText text={"Our Mission"} />
          </p>
          <p className="flex flex-col gap-4 self-stretch font-inter text-base font-medium text-richblack-300 ">
            Our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </p>
        </div>
      </section>

      <Stats />
      <section className="mx-autflex justify-center ">
        <LearningGrid />
      </section>

      <ContactFormSection />

      <Footer />
    </div>
  )
}

export default AboutUs
