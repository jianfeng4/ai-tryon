import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import SizeChartTable from "../SizeChartTable"

const Tryon = ({ face, close, sizeData, min }) => {
  console.log(sizeData, "sizeData11111111")
  const [isVisible, setIsVisible] = useState(true)
  const [showEnhance, setShowEnhance] = useState(false)
  const handleClose = () => {
    console.log("Closing the CSUI window")
    setIsVisible(false)
    // TODO: How to use backend message to handle window open/close
  }
  const regenerate = async () => {
    console.log("Regenerating the CSUI window")
    const resp = await sendToBackground({
      name: "ping",
      body: {
        id: 123
      }
    })
    console.log(resp, "resp")
  }
  if (!isVisible) return null
  const InfoView = () => {
    return (
      <div className="info-container">
        <div className="size-box">
          {/* <h1>Size Chart</h1> */}
          <SizeChartTable sizeData={sizeData} />
        </div>

        <div className="coupons-container">
          <h1>Coupons</h1>
        </div>

        <div className="feedback_container">
          <p>User Feedback</p>
        </div>
      </div>
    )
  }

  const EnhanceView = () => {
    return (
      <div className="enhance-container">
        <div className="title">Enhance Try-on</div>
        <div className="enhance-form">enhance form</div>
        <div>
          <button
            className="cancel-enhance-button"
            onClick={() => {
              setShowEnhance(false)
            }}>
            cancel
          </button>
          <button className="regenerate-button" onClick={regenerate}>
            regenerate
          </button>
        </div>
      </div>
    )
  }
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
          alt="Generated Image"
        />
        {!showEnhance && (
          <div
            className="enhance-button"
            onClick={() => {
              setShowEnhance(true)
            }}>
            <img src="" alt="" />
            <span>enhance tryon</span>
          </div>
        )}
      </div>

      {showEnhance ? <EnhanceView /> : <InfoView />}

      <div className="side-space">
        {/* <button onClick={min} className="close-button">
          min
        </button> */}
        <button onClick={close} className="close-button">
          ×
        </button>
      </div>
    </div>
  )
}

export default Tryon
