import React from "react"

import Logo from "~assets/logo1.png"
import CustomButton from "~components/CustomButton"
import CustomInput from "~components/CustomInput"
import { login } from "~service"
import { useRouteStore } from "~store"

import style from "./style.module.less"

export default () => {
  const [account, setAccount] = React.useState("")
  const [password, setPassword] = React.useState("")
  // 按钮loading
  const [loading, setLoading] = React.useState(false)
  const { route, setRoute } = useRouteStore()
  const access_token = localStorage.getItem("VD_access_token")

  const handleClick = () => {
    setLoading(true)
    login({ username: account, password }).then(() => {
      setLoading(false)
      const access_token = localStorage.getItem("VD_access_token")
      if (access_token) {
        setRoute("home")
      } else {
        alert("Login failed!")
      }
    })
  }

  if (access_token) {
    setRoute("home")
  } else {
    return (
      <div className={style["container"]}>
        <div className={style["logo"]}>
          <img className={style["logo-image"]} src={Logo} alt="" />
          <span className={style["logo-title"]}>DAZZR.AI</span>
        </div>
        <div className={style["title"]}>
          <span>LOGIN</span>
        </div>
        <div className={style["label"]}>User Name</div>
        <CustomInput
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          myStyle={{
            borderRadius: 20,
            height: "6vh"
          }}
        />
        <div className={style["label"]}>Password</div>
        <CustomInput
          myStyle={{
            borderRadius: 20,
            height: "6vh"
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <div className={style["button-wrapper"]}>
          <CustomButton
            buttonText="Continue"
            disabled={!account || !password}
            onClick={handleClick}
            loading={loading}
          />
        </div>

        <div className={style["link"]}>
          <span>
            Ready to join us? Click here to create your account today!
          </span>
        </div>
      </div>
    )
  }
}
