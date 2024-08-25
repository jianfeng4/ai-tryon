import React from "react"

import { useRouteStore } from "~store"
import Home from "~views/home-page"
import Login from "~views/login"
import Result from "~views/result"

export default () => {
  const { route } = useRouteStore()
  return (
    <div>
      {route === "home" ? (
        <Home />
      ) : route === "result" ? (
        <Result />
      ) : (
        <Login />
      )}
    </div>
  )
}
