import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"

const Tryon = ({ face, close }) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    console.log("Closing the CSUI window")
    setIsVisible(false)
    // TODO: How to use backend message to handle window open/close
  }

  if (!isVisible) return null

  return (
    <div className="query-text-anywhere-container">
      <div className="image-container">
        <img
          className="image-style"
          src={
            // 拼接前缀
            "data:image/png;base64," + face
          }
          // src="https://i.pinimg.com/originals/ed/2f/c2/ed2fc295a9232181f6e8b9c9d6f1bb9e.jpg"
          alt="Jennie model image"
        />
      </div>

      <div className="info-container">
        <div className="info-box">
          <h1>Size Chart</h1>
        </div>

        <div className="coupons-container">
          <h1>Coupons</h1>
        </div>
      </div>

      <div className="side-space">
        <button onClick={close} className="close-button">
          ×
        </button>
      </div>
    </div>
  )
}

export default Tryon
