import { UserOutlined } from "@ant-design/icons"
import { Avatar, Image, Space } from "antd"
import React, { useEffect, useRef, useState } from "react"

import aaa from "~assets/aaa.png"
import TryonIcon from "~assets/ai-tryon.png"
import Logo from "~assets/logo.png"
import Logo1 from "~assets/logo1.png"
import Logout from "~assets/logout.png"
import CustomButton from "~components/CustomButton"
import {
  getImage,
  getUserInfo,
  lastfewTryOnHistory,
  logout,
  refreshToken
} from "~service"
import { useRouteStore, useTryOnStore, useUserInfoStore } from "~store"

import style from "./style.module.less"

const domain = "https://aws-free.voguediffusion.ai/"

export default () => {
  const { route, setRoute } = useRouteStore()
  const { userInfo, setUserInfo } = useUserInfoStore()

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
        {/* <div className={style["header"]}>
          <div className={style["desc"]}>Free Attempt: 1/6</div>
          <div className={style["upgrade"]}>Upgrade</div>
        </div> */}
        <div className={style["scroll-container"]} ref={scrollRef}>
          <div>
            {imageUrls.length > 0 ? (
              <Space
                direction="vertical"
                size={10}
                style={{
                  width: "100%"
                }}>
                {imageUrls.map((imgUrl, index) => (
                  <Image
                    key={index}
                    src={imgUrl}
                    alt={`Image ${index}`}
                    width={230}
                    placeholder={
                      <Image preview={false} src={imgUrl} width={230} />
                    }
                    fallback="data:image/png;base64,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"
                  />
                ))}
              </Space>
            ) : (
              <p>Loading images...</p>
            )}
          </div>
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
            <img src={aaa} alt="" />
          </div>
        </div>
      </div>
      <div className={style["right"]}>
        <div className={style["right-top"]}>
          <Avatar
            size={40}
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
