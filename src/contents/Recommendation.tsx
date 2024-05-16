import cssText from "data-text:~/components/content/SizeRecommendationTable/style.css"
import React, { useEffect, useRef, useState } from "react"

import SizeRecommendationTable from "~components/content/SizeRecommendationTable"

type ShowName = "sizeRecommendation" | ""
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
const mock = [
  {
    Bust: {
      highlight: false,
      value: 31
    },
    Hips: {
      highlight: false,
      value: 31
    },
    Size: {
      highlight: false,
      value: "XXS"
    },
    Waist: {
      highlight: false,
      value: 22
    }
  },
  {
    Bust: {
      highlight: false,
      value: 32
    },
    Hips: {
      highlight: true,
      value: 33
    },
    Size: {
      highlight: false,
      value: "XS"
    },
    Waist: {
      highlight: false,
      value: 24
    }
  },
  {
    Bust: {
      highlight: false,
      value: 34
    },
    Hips: {
      highlight: false,
      value: 35
    },
    Size: {
      highlight: false,
      value: "S"
    },
    Waist: {
      highlight: false,
      value: 25
    }
  },
  {
    Bust: {
      highlight: false,
      value: 35
    },
    Hips: {
      highlight: false,
      value: 38
    },
    Size: {
      highlight: false,
      value: "M"
    },
    Waist: {
      highlight: false,
      value: 27
    }
  },
  {
    Bust: {
      highlight: false,
      value: 36
    },
    Hips: {
      highlight: false,
      value: 40
    },
    Size: {
      highlight: false,
      value: "L"
    },
    Waist: {
      highlight: false,
      value: 28
    }
  },
  {
    Bust: {
      highlight: false,
      value: 38
    },
    Hips: {
      highlight: false,
      value: 43
    },
    Size: {
      highlight: false,
      value: "XL"
    },
    Waist: {
      highlight: true,
      value: 30
    }
  },
  {
    Bust: {
      highlight: true,
      value: 42
    },
    Hips: {
      highlight: false,
      value: 46
    },
    Size: {
      highlight: false,
      value: "XXL"
    },
    Waist: {
      highlight: false,
      value: 33
    }
  }
]
const TryonContent = () => {
  const [sizeRecommendationData, setSizeRecommendationData] = useState([])

  const [showName, setShowName] = useState<ShowName>("")
  const sizeRecommendationRef = useRef(null)
  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      const { name, body } = message
      console.log("message!!!!!!!!!", message)
      setShowName(name)

      if (name === "sizeRecommendation") {
        console.log(
          body?.sizeRecommendationData,
          "body?.sizeRecommendationData"
        )
        setSizeRecommendationData(body?.sizeRecommendationData)
      }
    }
    chrome.runtime.onMessage.addListener(handleMessage)
  }, [showName])

  useEffect(() => {
    getStyle()
  }, [])

  useEffect(() => {
    const dragElement = sizeRecommendationRef.current
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
  const close = () => {
    setShowName("")
  }
  if (showName === "sizeRecommendation") {
    return (
      <div
        ref={sizeRecommendationRef}
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          cursor: "move"
        }}>
        <SizeRecommendationTable sizeRecommendationData={mock} close={close} />
      </div>
    )
  }
}

export default TryonContent
