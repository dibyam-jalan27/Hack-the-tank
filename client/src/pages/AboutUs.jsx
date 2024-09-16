import React from "react"
import Footer from "../components/common/Footer"
import HighLightText from "../components/core/HomePage/HighlightText"
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
            EMPOWER YOUR SUCCESS WITH US <br></br>
            <HighLightText
              text={"Elevate Your Stitching Game with Unique & Trendy Styles"}
            ></HighLightText>
          </p>

          <div className="self-stretch text-center font-inter text-base font-medium text-richblack-300 ">
            "Discover Your Unique Style: Join us at Radha Rani Coaching for an
            immersive stitching experience. Learn essential techniques, gain
            confidence, and unleash your creativity. Our dedicated instructors
            will guide you every step of the way. Be a trendsetter, not a
            follower. Let's create the fashion of the future together, thread by
            thread. Novice or pro, our supportive community welcomes you.
            Embrace stitching and craft something extraordinary with us."
          </div>
        </div>

        <div className="relative flex translate-y-[60px] justify-center ">
          <img
            src="https://diy-assets.classplus.co/_next/image?url=https://ali-cdn-diy-public.classplus.co/prod/Untitled%20design_1700752379501.png&w=1920&q=75"
            className=" z-10 h-[19rem] w-[25rem] rounded-l-[23rem] object-cover  "
            alt="first"
          />
          <img
            src="https://diy-assets.classplus.co/_next/image?url=https://ali-cdn-diy-public.classplus.co/prod/Surat%20Ke%20Teacher,%20Bharat%20ka%20Future_1700821782209.png&w=1920&q=75"
            className="z-10 h-[19rem] w-[25rem] object-cover"
            alt="second"
          />
          <img
            src="https://diy-assets.classplus.co/_next/image?url=https://ali-cdn-diy-public.classplus.co/prod/Untitled%20design_1700661306421.png&w=1920&q=75"
            className="z-10 h-[19rem] w-[25rem] rounded-r-[23rem] object-cover"
            alt="third"
          />
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
              Thread by Thread, We Create Trends. At our stitching workshops, we
              invite you to immerse yourself in the art of needle and thread. We
              believe that fashion isn't just about following trends; it's about
              creating your own unique style. In our hands-on classes, you'll
              learn the essential techniques and gain the confidence to turn
              your creative visions into reality. Our passionate instructors are
              dedicated to guiding you through every step of the stitching
              process, helping you bring your ideas to life.
            </p>

            <p>
              We don't just follow trends; we set them. Join us in this journey
              of self-expression, where you'll craft one-of-a-kind pieces that
              reflect your individuality. Be a trendsetter, not a trend
              follower. Together, thread by thread, we'll create the fashion of
              the future. Whether you're a novice or an experienced stitcher,
              our welcoming community is here to inspire and support you. Join
              us in the world of stitching, where creativity knows no bounds,
              and where your unique style takes center stage. Embrace the art of
              stitching, and let's craft something extraordinary together.
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
