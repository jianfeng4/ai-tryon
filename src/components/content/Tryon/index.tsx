import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { sendToBackground } from "@plasmohq/messaging";

import SizeChartTable from "../SizeChartTable";

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
};
const Tryon = ({ face, close, sizeData }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showEnhance, setShowEnhance] = useState(false);
  const [enhanceImage, setEnhanceImage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const resp = await sendToBackground({
      name: "ping",
      body: {
        enhanceTryOnData: data
      }
    });
    const { image } = resp.body;
    setEnhanceImage(image);
    setShowEnhance(false);
    console.log("Response from background_img", resp);
  };

  console.log(watch("example")); // watch input value by passing the name of it
  const regenerate = async () => {
    console.log("Regenerating the CSUI window");
    handleSubmit(onSubmit);
  };
  if (!isVisible) return null;
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
          <h1>Coupon</h1>
          <h1>Coupon</h1>
          <h1>Coupon</h1>
          <h1>Coupon</h1>
          <h1>Coupon</h1>
        </div>

        <div className="feedback_container">
          <p>User Feedback</p>
        </div>
      </div>
    );
  };
  const EnhanceView = () => {
    return (
      <div className="enhance-container">
        <div className="title">Enhance Try-on</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inner">
            {["Ethnicity", "Gender", "BodyShape"].map((name) => {
              return (
                <div className="select-container">
                  <label htmlFor="">{name}</label>
                  <select name={name} {...register(name)}>
                    {optionsMap[name].map((option) => {
                      return <option value={option}>{option}</option>;
                    })}
                  </select>
                </div>
              );
            })}
            <div className="input_handler">
              <label htmlFor="">Hair Style</label>
              <input {...register("age")} />
            </div>
          </div>



          {/* 底部按钮 */}
          <div className="enhance-button-container">
            <button
              className="cancel-enhance-button"
              onClick={() => {
                setShowEnhance(false);
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
    );
  };
  return (
    <div className="query-text-anywhere-container">
      <div className="image-container">
        <img
          className="image-style"
          // "data:image/png;base64," + face
          src={
            enhanceImage?`data:image/png;base64,${enhanceImage}`: `data:image/png;base64,${face}`
          }
          // src="https://i.pinimg.com/originals/ed/2f/c2/ed2fc295a9232181f6e8b9c9d6f1bb9e.jpg"
          alt="Generated Image"
        />
        {!showEnhance && (
          <div
            className="enhance-button"
            onClick={() => {
              setShowEnhance(true);
            }}>
            <img src="" alt="" />
            <span className="text_in_button">Enhance Try on</span>
          </div>
        )}
      </div>

      {showEnhance ? <EnhanceView /> : <InfoView />}

      {/* <button onClick={min} className="close-button">
        min
      </button> */}
      <button onClick={close} className="close-button">
        ×
      </button>
    </div>
  );
};

export default Tryon;
