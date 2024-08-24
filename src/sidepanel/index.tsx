import React from "react"

import { useRouteStore } from "~store"
import Home from "~views/home-page"
import Login from "~views/login"

export default () => {
  const { route, setRout } = useRouteStore()
  return (
    <div style={{ padding: 16 }}>{route === "home" ? <Home /> : <Login />}</div>
  )
}
