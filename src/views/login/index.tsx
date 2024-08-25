import Button from "@material-ui/core/Button"
import React from "react"
import { useNavigate } from "react-router-dom"

import Logo from "~assets/logo.png"
import { useRouteStore } from "~store"

import "./style.less"

import Input from "~components/Input"

export default () => {
  const [account, setAccount] = React.useState("")
  const [password, setPassword] = React.useState("")
  const { route, setRoute } = useRouteStore()
  return (
    <div className="container">
      <div className="logo">
        <img className="logo-image" src={Logo} alt="" />
        <span>DAZZR.AI</span>
        {JSON.stringify(route)}
      </div>
      <div className="title">
        <span>LOGIN</span>
      </div>
      <div className="label">User Name</div>
      <Input
        value={account}
        onChange={(e) => {
          setAccount(e.target.value)
        }}
      />
      <div className="label">Password</div>
      <Input
        style={{
          borderRadius: 20
        }}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        inputType="password"
      />
      <div className="button-wrapper">
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
            setRoute("home")
          }}></Button>
      </div>

      <div className="link">
        <span>Ready to join us? Click here to create your account today!</span>
      </div>
    </div>
  )
}
