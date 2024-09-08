import Button from "@material-ui/core/Button"
import React from "react"

// import { useNavigate } from "react-router-dom"

import Logo from "~assets/logo.png"
import Input from "~components/Input"
import { login } from "~service"
import { useRouteStore } from "~store"

import style from "./style.module.less"

export default () => {
  const [account, setAccount] = React.useState("")
  const [password, setPassword] = React.useState("")
  const { route, setRoute } = useRouteStore()
  const access_token = localStorage.getItem("VD_access_token")
  if (access_token) {
    setRoute("home")
  } else {
    return (
      <div className={style["container"]}>
        <div className={style["logo"]}>
          <img className={style["logo-image"]} src={Logo} alt="" />
          <span>DAZZR.AI111111</span>
        </div>
        <div className={style["title"]}>
          <span>LOGIN</span>
        </div>
        <div className={style["label"]}>User Name</div>
        <Input value={account} onChange={(e) => setAccount(e.target.value)} />
        <div className={style["label"]}>Password</div>
        <Input
          style={{
            borderRadius: 20
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          inputType="password"
        />
        <div className={style["button-wrapper"]}>
          <Button
            style={{
              borderRadius: 20
            }}
            children={<span style={{ textTransform: "none" }}>Continue</span>}
            variant="contained"
            disabled={!account || !password}
            fullWidth={true}
            color="primary"
            onClick={() => {
              console.log(account, password)
              login({ username: account, password }).then(() => {
                const access_token = localStorage.getItem("VD_access_token")
                if (access_token) {
                  setRoute("home")
                } else {
                  alert("Login failed!")
                }
              })
            }}></Button>
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
