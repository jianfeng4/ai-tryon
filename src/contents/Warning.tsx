import cssText from "data-text:~/components/content/Warning/style.css"
import React, { useEffect, useRef, useState } from "react"

import Warning from "~components/content/Warning"

type ShowName = "showWarning" | ""
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const WarningContent = () => {
  const [text, setText] = useState('')

  const [showName, setShowName] = useState<ShowName>("")
  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      const { name, body } = message
      setShowName(name)
      if (name === "showWarning") {
        setText(body?.text)
      }
    }
    chrome.runtime.onMessage.addListener(handleMessage)
  }, [showName])

  useEffect(() => {
    getStyle()
  }, [])

  const close = () => {
    setShowName("")
  }
  if (showName === "showWarning") {
    return (
      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          cursor: "move"
        }}>
        <Warning
          text={text}
          close={close}
        />
      </div>
    )
  }
}

export default WarningContent
