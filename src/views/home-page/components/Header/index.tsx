import { UserOutlined } from "@ant-design/icons"
import { Avatar, Space } from "antd"
import React, { useState } from "react"

import HeaderHover from "~assets/header-hover.png"
import Logo from "~assets/logo1.png"
import { useUserInfoStore } from "~store"

import style from "./style.module.less"

const Header: React.FC = () => {
  const { userInfo, setUserInfo } = useUserInfoStore()

  const [hideAvatar, setHideAvatar] = useState(false)

  return (
    <div className={style["header"]}>
      <div className={style["header-logo"]}>
        <img className={style["logo-image"]} src={Logo} alt="" />
        <span className={style["logo-title"]}>DAZZR.AI</span>
      </div>
      <div className={style["header-content"]}>
        <div className={style["text"]}>
          <div className={style["name"]}>hello,{userInfo.first_name}</div>
          <div className={style["name"]}>Let’s Discover</div>
          <div className={style["name"]}>Your Next Look</div>
        </div>

        <div
          className={style["avatar-container"]}
          style={
            hideAvatar
              ? {
                  position: "relative"
                }
              : {}
          }
          onMouseEnter={() => {
            setHideAvatar(true)
          }}
          onMouseLeave={() => {
            setHideAvatar(false)
          }}>
          <Avatar
            size={95}
            src={`https://aws-free.voguediffusion.ai/users/image/${userInfo.avatar_url}`}
            alt=""
            style={hideAvatar ? { opacity: 0.5 } : {}}
            icon={<UserOutlined />}
          />

          {hideAvatar && (
            <div className={style["change-header"]}>
              <img src={HeaderHover} className={style["hover-icon"]} alt="" />
              <div>Change Photo</div>
              <div className={style["hover-info"]}>
                {[userInfo.shap, userInfo.age, userInfo.gender].map((item) => (
                  <div className={style["hover-info-item"]}>{item}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header