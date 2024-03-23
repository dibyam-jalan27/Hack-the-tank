import React, { useEffect } from "react"

const ChatBot = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      window.botpressWebChat.init({
        botId: "6e9f3372-950a-454b-adc1-e50c0e0ea4d8",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "6e9f3372-950a-454b-adc1-e50c0e0ea4d8",
      })
    }
  }, [])

  return <div id="webchat" />
}

export default ChatBot
