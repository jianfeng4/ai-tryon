import { UserOutlined } from "@ant-design/icons"
import { Avatar, Space } from "antd"
import React, { useEffect, useState } from "react"

import TryonIcon from "~assets/ai-tryon.png"
import Logo from "~assets/logo.png"
import Logout from "~assets/logout.png"
import { logout } from "~service"
import { useRouteStore, useUserInfoStore } from "~store"
import { getFromLocalStorage } from "~utils/save"

import style from "./style.module.less"

const Right: React.FC = () => {
  const { route, setRoute } = useRouteStore()
  const { userInfo, setUserInfo } = useUserInfoStore()
  const [avatar, setAvatar] = useState("")
  console.log("🚀 ~ getFromLocalStorage ~ res:")

  useEffect(() => {
    getFromLocalStorage("userAvatar").then((res) => {
      setAvatar(res)
    })
  }, [userInfo])

  const handleLogout = () => {
    logout()
    setRoute("login")
  }
  return (
    <div className={style["right"]}>
      <div className={style["right-top"]}>
        <Avatar size={40} src={avatar} icon={<UserOutlined />} />
        <div
          className={style["icon"]}
          onClick={() => {
            setRoute("home")
          }}>
          <img src={TryonIcon} alt="" />
          <div>AI Try-On</div>
        </div>
        <div className={style["icon"]}>
          <img src={Logo} alt="" />
          <div>Website</div>
        </div>
      </div>

      <div className={style["icon"]} onClick={handleLogout}>
        <img src={Logout} alt="" />
        <div>Logout</div>
      </div>
    </div>
  )
}

export default Right
