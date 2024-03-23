import React from "react"

const HighLightText = ({ text, bg }) => {
  const myStyle = {
    background: `${
      bg
        ? bg
        : "-webkit-linear-gradient(rgba(31, 162, 255, 1), rgba(18, 216, 250, 1), rgba(166, 255, 203, 1))"
    }`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }

  return <span style={myStyle}>{text}</span>
}

export default HighLightText
