import { UserOutlined } from "@ant-design/icons"
import Button from "@material-ui/core/Button"
import { Avatar } from "antd"
import React, { useEffect, useRef, useState } from "react"

import aaa from "~assets/aaa.png"
import TryonIcon from "~assets/ai-tryon.png"
import Logo from "~assets/logo.png"
import Logo1 from "~assets/logo1.png"
import Logout from "~assets/logout.png"
import Input from "~components/Input"
import {
  getImage,
  getUserInfo,
  lastfewTryOnHistory,
  logout,
  refreshToken
} from "~service"
import { useRouteStore, useTryOnStore } from "~store"

import style from "./style.module.less"

const domain = "https://aws-free.voguediffusion.ai/"

export default () => {
  // const [account, setAccount] = React.useState("")
  // const [password, setPassword] = React.useState("")
  const { route, setRoute } = useRouteStore()
  const { headerUrl, setHeaderUrl } = useTryOnStore()

  const [imageUrls, setImageUrls] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement | null>(null) // 用于引用容器
  const handleLogout = () => {
    logout()
    setRoute("login")
  }
  useEffect(() => {
    // 异步获取图片
    const fetchImages = async () => {
      const tryon_history = await lastfewTryOnHistory("0")
      console.log(tryon_history)

      const urls = Object.keys(tryon_history)
        .filter((key) => tryon_history[key].url)
        .map((key) => tryon_history[key].url)
        .reverse() // 倒序排列
      console.log(urls)

      const fetchedImages = await Promise.all(urls.map((url) => getImage(url)))
      setImageUrls(fetchedImages.filter(Boolean) as string[])

      // // 图片加载完成后，再次滚动到底部
      // if (scrollRef.current) {
      //   scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      // }
    }

    fetchImages().then(() => {})
  }, [])
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }

    if (imageUrls.length > 0) {
      const lastImage = scrollRef.current?.querySelector(
        "img:last-child"
      ) as HTMLImageElement
      if (lastImage) {
        lastImage.onload = () => scrollToBottom() // 确保最后一张图片加载完成后再滚动
      } else {
        scrollToBottom()
      }
    }
  }, [imageUrls])

  return (
    <div className={style["container"]}>
      <div className={style["left"]}>
        <div className={style["header"]}>
          {/* <div className={style["desc"]}>Free Attempt: 1/6</div>
          <div className={style["upgrade"]}>Upgrade</div> */}
        </div>
        <div className={style["scroll-container"]} ref={scrollRef}>
          <div>
            {imageUrls.length > 0 ? (
              imageUrls.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Image ${index}`}
                  style={{ width: "230px", height: "auto" }}
                />
              ))
            ) : (
              <p>Loading images...</p>
            )}
          </div>
          <div className={style["line1"]}></div>
          <div className={style["buy"]}>
            {/* <p>Extra Free Access Arriving Next Week</p> */}
            <div>
              {/* <span>Click here</span>
              <span>
                to upgrade to Premium for unlimited access and skip the wait.
              </span> */}

              <div className={style["button"]}>Premium Feature Coming Soon</div>
            </div>
          </div>
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
            <img src={aaa} alt="" />
          </div>
        </div>
      </div>
      <div className={style["right"]}>
        <div className={style["right-top"]}>
          <Avatar
            size={95}
            src={`https://aws-free.voguediffusion.ai/users/image/${userInfo.avatar_url}`}
            icon={<UserOutlined />}
          />

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
    </div>
  )
}
