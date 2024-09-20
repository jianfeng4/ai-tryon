import Button from "@material-ui/core/Button"
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import aaa from "~assets/aaa.png"
import TryonIcon from "~assets/ai-tryon.png"
import Logo from "~assets/logo.png"
import Logo1 from "~assets/logo1.png"
import Logout from "~assets/logout.png"
import Input from "~components/Input"
import { getImage, lastfewTryOnHistory } from "~service"
import { useRouteStore } from "~store"

import style from "./style.module.less"

const domain = "https://aws-free.voguediffusion.ai/"

export default () => {
  // const [account, setAccount] = React.useState("")
  // const [password, setPassword] = React.useState("")
  const { route, setRoute } = useRouteStore()
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement | null>(null) // 用于引用容器

  useEffect(() => {
    // 初始滚动到底部
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }

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

      // 图片加载完成后，再次滚动到底部
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }

    fetchImages()
  }, [])

  return (
    <div className={style["container"]}>
      <div className={style["left"]}>
        <div className={style["header"]}>
          <div className={style["desc"]}>Free Attempt: 1/6</div>
          <div className={style["upgrade"]}>Upgrade</div>
        </div>
        <div className={style["scroll-container"]}>
          <div>
            {imageUrls.length > 0 ? (
              imageUrls.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Image ${index}`}
                  style={{ width: "200px", height: "auto" }}
                />
              ))
            ) : (
              <p>Loading images...</p>
            )}
          </div>
          <div className={style["line1"]}></div>
          <div className={style["buy"]}>
            <p>Extra Free Access Arriving Next Week</p>
            <div>
              <span>Click here</span>
              <span>
                to upgrade to Premium for unlimited access and skip the wait.
              </span>

              <div className={style["button"]}>Upgrade to Premium</div>
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
          <div className={style["image"]}>
            <img
              src="https://ts1.cn.mm.bing.net/th?id=OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
              alt=""
            />
          </div>

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

        <div className={style["icon"]}>
          <img src={Logout} alt="" />
          <div>Logout</div>
        </div>
      </div>
    </div>
  )
}
