import React, { useEffect, useState } from "react"

import aaa from "~assets/aaa.png"
import Logo1 from "~assets/logo1.png"
import CustomButton from "~components/CustomButton"
import { bottomLinks } from "~config/links"

import style from "./style.module.less"

const BottomInfo: React.FC = () => {
  return (
    <>
      <div className={style["line1"]}></div>
      <CustomButton
        buttonText={"Premium Feature Comming Soon"}
        onClick={() => {}}
        myStyle={{
          fontSize: 10,
          boxShadow: "none"
        }}
      />
      <div className={style["line2"]}></div>
      <div className={style["info"]}>
        <div className={style["logo"]}>
          <img src={Logo1} alt="" />
          <span>DAZZR.AI</span>
        </div>

        <p>Contact Us: contact@dazzr.ai</p>
        <p>
          Check out our latest news on our AI product, from technology
          innovation and industry trends to fashion and styling tips, user
          reviews, and videos @DAZZR.AI
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 15,
            cursor: "pointer"
          }}>
          {bottomLinks.map((item, index) => {
            return (
              <div
                onClick={() => {
                  window.open(item.url, "_blank")
                }}>
                <item.icon />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default BottomInfo
