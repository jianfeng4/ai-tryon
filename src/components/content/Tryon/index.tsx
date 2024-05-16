import { url } from "inspector"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

import { sendToBackground } from "@plasmohq/messaging"

import Deals from "../Deals"
import SizeChartTable from "../SizeChartTable"
import LoadingPopup from "./Loading"

const optionsMap = {
  Ethnicity: [
    "African American",
    "Hispanic ",
    "Asian",
    "White",
    "Native American",
    "Native Hawaiian",
    "Middle Eastern"
  ],
  Gender: ["Female", "Male"],
  BodyShape: ["Slim", "Fit", "Curvy"]
}
const Tryon = ({ face, close, sizeData, dealsData }) => {
  const [image, setImage] = useState(face)
  const [showLoading, setShowLoading] = useState(false)
  const [showEnhance, setShowEnhance] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    setShowLoading(true)
    const resp = await sendToBackground({
      name: "ping",
      body: {
        enhanceTryOnData: data
      }
    })
    const { image } = resp.body
    setImage(image)
    setShowEnhance(false)
    setShowLoading(false)
    console.log("Response from background_img", resp)
  }

  console.log(watch("example")) // watch input value by passing the name of it
  const regenerate = async () => {
    console.log("Regenerating the CSUI window")
    handleSubmit(onSubmit)
  }
  const InfoView = () => {
    return (
      <div className="info-container">
        <div className="size_recommandation">
          <p>Your size is: </p>{" "}
          {/* TODO: fetch size recommandation from backend */}
        </div>
        <div className="size-box">
          <SizeChartTable sizeData={sizeData} />
        </div>

        <div className="coupons-container">
          <Deals dealsData={dealsData} />
        </div>

        <div className="feedback_container">
          <p>User Feedback</p>
        </div>
      </div>
    )
  }
  const EnhanceView = () => {
    return (
      <div className="info-container">
        <div className="title">Edit Try-On</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inner">
            {["Ethnicity", "Gender", "BodyShape"].map((name) => {
              return (
                <div className="select-container">
                  <label htmlFor="">{name}</label>
                  <select name={name} {...register(name)}>
                    {optionsMap[name].map((option) => {
                      return <option value={option}>{option}</option>
                    })}
                  </select>
                </div>
              )
            })}
            <div className="input_handler">
              <label htmlFor="">Hair Color and Hair Style</label>
              <input {...register("hairStyle")} />
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="enhance-button-container">
            <button
              className="cancel-enhance-button"
              onClick={() => {
                setShowEnhance(false)
              }}>
              Cancel
            </button>

            <input
              className="regeneration-enhance-input"
              type="submit"
              value="Regenerate"
              onClick={regenerate}
            />
          </div>
        </form>
      </div>
    )
  }
  return (
    <div className="query-text-anywhere-container">
      <div className="image-container">
        <img
          className="image-style"
          src={`data:image/png;base64,${image}`}
          // src="https://i.pinimg.com/originals/ed/2f/c2/ed2fc295a9232181f6e8b9c9d6f1bb9e.jpg"
          alt="Generated Image"
        />
        {showLoading && (
          <div className="editLoading">
            <LoadingPopup loadingText={"Editing tryon, please waite"} />
          </div>
        )}

        {!showEnhance && !showLoading && (
          <div
            className="enhance-button"
            onClick={() => {
              setShowEnhance(true)
            }}>
            <img src="" alt="" />
            <span className="text_in_button">Edit Try-On</span>
          </div>
        )}
      </div>

      {showEnhance && !showLoading ? <EnhanceView /> : <InfoView />}
      <button onClick={close} className="close-button">
        ×
      </button>
    </div>
  )
}

export default Tryon
