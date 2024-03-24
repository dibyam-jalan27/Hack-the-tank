import React, { useState } from "react"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useParams } from "react-router-dom"

function Roompage() {
  const { roomId } = useParams()
  const [userName, setUserName] = useState("")

  const myMeeting = async (element) => {
    const appID = 1060886341
    const serverSecret = "7ecc4315f9255fbfb0f7f27334196d95"
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      userName
    )
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    zp.joinroom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
      },
    })
  }

  return (
    <div>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)} // Update userName in state
        placeholder="Enter your username"
      />
      <div ref={myMeeting} />
    </div>
  )
}

export default Roompage
