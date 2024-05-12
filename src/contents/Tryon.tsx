import cssText from "data-text:~/components/content/Tryon/style.css"
import React, { useEffect, useRef, useState } from "react"

import Tryon from "~components/content/Tryon"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  document.head.appendChild(style) // Ensure the style is applied to the document
  return style
}

const TryonContent = () => {
  const [show, setShow] = useState(false)
  const [face, setFace] = useState("")
  const [sizeData, setSizeData] = useState([])
  const tryonRef = useRef(null)
  const isDragging = useRef(false) // To track dragging state
  const offset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    getStyle()

    const handleMessage = (message, sender, sendResponse) => {
      if (message.name === "showTryon") {
        setFace(message?.params?.face || "")
        setSizeData(message?.params?.sizeData || [])
        setTimeout(() => setShow(true), 1000)
        sendResponse("")
      }
      return true
    }

    chrome.runtime.onMessage.addListener(handleMessage)
    return () => chrome.runtime.onMessage.removeListener(handleMessage)
  }, [])

  useEffect(() => {
    const dragElement = tryonRef.current
    if (!dragElement) {
      return
    }

    const onMouseMove = (event) => {
      event.preventDefault() // Prevent default to avoid selection start
      if (isDragging.current) {
        // 加入页面滚动的偏移量
        const mouseX = event.clientX + window.scrollX
        const mouseY = event.clientY + window.scrollY
        dragElement.style.left = `${mouseX - offset.current.x}px`
        dragElement.style.top = `${mouseY - offset.current.y}px`
      }
    }

    const onMouseUp = () => {
      isDragging.current = false
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseDown = (event) => {
      isDragging.current = true
      offset.current.x =
        event.clientX - dragElement.getBoundingClientRect().left
      offset.current.y = event.clientY - dragElement.getBoundingClientRect().top
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    }

    dragElement.addEventListener("mousedown", onMouseDown)

    return () => {
      dragElement.removeEventListener("mousedown", onMouseDown)
    }
  }, [show]) // Ensure that this effect runs when `show` changes.

  return (
    <>
      {show /* true OR show */ ? (
        <div
          ref={tryonRef}
          style={{
            position: "absolute",
            zIndex: 1000,
            cursor: "grab"
          }}>
          <Tryon
            face={face}
            sizeData={sizeData}
            close={() => setShow(false)}
            min={() => {}}
          />
        </div>
      ) : null}
    </>
  )
}

export default TryonContent
