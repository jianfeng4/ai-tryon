import Button from "@material-ui/core/Button"
import React from "react"
import { useNavigate } from "react-router-dom"

import aaa from "~assets/aaa.png"
import TryonIcon from "~assets/ai-tryon.png"
import Logo from "~assets/logo.png"
import Logo1 from "~assets/logo1.png"
import Input from "~components/Input"
import { useRouteStore } from "~store"

import style from "./style.module.less"

const mock = [
  "https://ts1.cn.mm.bing.net/th?id=OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  "https://ts1.cn.mm.bing.net/th?id=OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  "https://ts1.cn.mm.bing.net/th?id=OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",

  "https://ts1.cn.mm.bing.net/th?id=OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",

  "https://ts1.cn.mm.bing.net/th?id=OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
]
export default () => {
  const [account, setAccount] = React.useState("")
  const [password, setPassword] = React.useState("")
  const { route, setRoute } = useRouteStore()
  return (
    <div className={style["container"]}>
      <div className={style["left"]}>
        <div className={style["header"]}>
          <div className={style["desc"]}>Free Attempt: 1/6</div>
          <div className={style["upgrade"]}>Upgrade</div>
        </div>
        <div className={style["content"]}>
          {mock.map((item) => {
            return (
              <div className={style["result-item"]}>
                <img src={item} alt="" />
              </div>
            )
          })}
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
      <div className={style["right"]}>
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
    </div>
  )
}
