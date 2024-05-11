import cssText from "data-text:~/components/content/Tryon/style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useState } from "react"

import Tryon from "~components/content/Tryon"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
const TryonConetnt = () => {
  const [show, setShow] = useState(false)
  const [face, setFace] = useState("")
  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      console.log("Message received from background:", message)
      if (message.name === "showTryon") {
        console.log(message, "message")
        setShow(true)
        setFace(message?.params?.face || "")
        sendResponse("") // 你可以在这里发送一个具体的响应回 background
      }
      return true // 这可以保持消息通道开启，以便异步使用sendResponse
    }

    chrome.runtime.onMessage.addListener(handleMessage)

    // 组件卸载时移除监听器
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, []) // 空依赖数组确保只在组件挂载时添加监听器，并在卸载时移除
  // res.send(document.querySelector(req.body).textContent)
  return (
    <>
      {show ? (
        <Tryon
          face={face}
          close={() => {
            setShow(false)
          }}
        />
      ) : null}
    </>
  )
}

export default TryonConetnt
