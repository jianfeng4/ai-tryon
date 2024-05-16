import cssText from "data-text:~/components/content/Tryon/style.css"
import React, { useEffect, useRef, useState } from "react"

import Loading from "~components/content/Loading"
import SizeChartTable from "~components/content/SizeChartTable"
import Tryon from "~components/content/Tryon"

type ShowName =
  | "showLoading"
  | "hideLoading"
  | "showTryon"
  | "hideTryon"
  | "addLoading"
  | "sizeRecommendation"
  | ""
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  document.head.appendChild(style)
  return style
}

const TryonContent = () => {
  const sizeDataRef = useRef([])
  const [show, setShow] = useState(true)
  const [face, setFace] = useState("")
  const [sizeData, setSizeData] = useState([])
  const [sizeRecommendationData, setSizeRecommendationData] = useState([])
  const [dealsData, setDealsDate] = useState([])
  const [showName, setShowName] = useState<ShowName>("")
  const [loadingText, setLoadingText] = useState("")
  const tryonRef = useRef(null)
  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      const { name, body } = message
      console.log("message!!!!!!!!!", message)
      setShowName(name)
      if (name === "showTryon") {
        setFace(body?.face || "")
        setSizeData(body?.sizeData || [])
        setDealsDate(body?.dealsData || [])
        sendResponse("")
      }
      if (name === "showLoading") {
        setLoadingText(body?.loadingText)
      }
      if (name === "sizeRecommendation") {
        setSizeRecommendationData(body?.sizeRecommendationData)
      }
    }
    chrome.runtime.onMessage.addListener(handleMessage)
  }, [showName])

  useEffect(() => {
    getStyle()
  }, [])
  useEffect(() => {
    sizeDataRef.current = sizeData
  }, [sizeData])
  useEffect(() => {
    const dragElement = tryonRef.current
    if (!dragElement) {
      return
    }

    const onMouseMove = (event) => {
      // return
      event.preventDefault() // 阻止默认行为，避免选择文本或其他元素
      if (!isDragging.current) return
      // 移除transform属性，确保元素的位置准确无误
      dragElement.style.transform = `translate(-${offset.current.x}px, -${offset.current.y}px)`
      const mouseX = event.clientX // 鼠标的位置
      const mouseY = event.clientY //鼠标的位置
      dragElement.style.left = `${mouseX}px`
      dragElement.style.top = `${mouseY}px`
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

      console.log(offset.current.x, "offset.current.x") //鼠标位置与元素左上角的距离
      console.log(offset.current.y, "offset.current.y") //鼠标位置与元素左上角的距离
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    }

    dragElement.addEventListener("mousedown", onMouseDown)

    return () => {
      dragElement.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [showName])
  if (showName === "showTryon") {
    return (
      <div
        ref={tryonRef}
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          cursor: "move"
        }}>
        <Tryon face={face} dealsData={dealsData} sizeData={sizeData} close={() => setShowName("")} />
      </div>
    )
  }
  if (showName === "showLoading") {
    return (
      <Loading
        loadingText={loadingText || "Generating Virtual Try-On, Please Wait..."}
      />
    )
  }
  if (showName === "sizeRecommendation") {
    return (
      <div>
        <SizeChartTable sizeData={sizeRecommendationData} />
      </div>
    )
  }
}

export default TryonContent
