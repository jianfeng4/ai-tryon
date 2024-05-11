import cssText from "data-text:~/components/content/Loading/style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useState } from "react"

import Loading from "~components/content/Loading"

export const config: PlasmoCSConfig = {
  all_frames: true
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
const LoadingConetnt = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      console.log("Message received from background:", message)
      if (message === "showLoading") {
        setShow(true)
        sendResponse("") // 你可以在这里发送一个具体的响应回 background
      } else if (message === "hideLoading") {
        setShow(false)
        sendResponse("")
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
        <Loading loadingText={"Generating Virtual Try-On, Please Wait..."} />
      ) : null}
    </>
  )
}

export default LoadingConetnt
