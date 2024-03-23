import React from "react"
import CTAButton from "../../common/CTAButton"
import HighLightText from "./HighLightText"
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from "react-type-animation"
import "./cb.css"

const CodeBlock = ({
  position,
  beforehead,
  highlight,
  afterhead,
  subheading,
  cta1,
  cta2,
  code,
  bg,
}) => {
  return (
    <div
      className={`jj flex ${position} w-fit items-center justify-around py-14`}
    >
      <div className="flex w-[40%] justify-center">
        <div className={`flex max-w-[900px] flex-col gap-3`}>
          <div className="first-letter font-inter text-4xl font-semibold not-italic leading-[2.75rem]  text-white">
            {beforehead}
            <HighLightText text={highlight} />
            {afterhead}
          </div>

          <div className="flex flex-col self-stretch font-inter text-base font-medium text-richblack-300 ">
            {subheading}
          </div>

          <div className="flex flex-row gap-6 pt-14">
            <CTAButton active={cta1.active} linkto={cta1.linkto}>
              <div className="flex items-center gap-2">
                {cta1.text}
                <FaArrowRight />
              </div>
            </CTAButton>
            <CTAButton active={cta2.active} linkto={cta2.linkto}>
              {cta2.text}
            </CTAButton>
          </div>
        </div>
      </div>

      <div
        className="relative flex min-w-[450px] max-w-[720px] justify-center gap-1 border border-black p-2 py-8"
        style={{
          background:
            "linear-gradient(141deg, rgba(14, 26, 45, 0.24) 0%, rgba(17, 30, 50, 0.38) 100%)",
          backdropFilter: "blur(26px)",
        }}
      >
        <div
          className="flex w-[10%] flex-col items-center gap-[0.275rem] py-1 text-center font-mono font-bold text-richblack-400"
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.35rem",
          }}
        >
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`flex w-[90%] flex-col pt-[0.2rem] font-mono leading-[0.85rem] text-[#ffd60a]`}
          style={{ fontSize: "1rem" }}
        >
          <TypeAnimation
            sequence={[code, 2000, ""]}
            repeat={Infinity}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>

        <div
          className="absolute -left-1 top-[-1rem] h-[19rem] w-[25rem] rounded-[23rem] opacity-20 blur-[34px]"
          style={{ background: `${bg}` }}
        ></div>
      </div>
    </div>
  )
}
export default CodeBlock
