import React, { useEffect } from "react"

import { refreshToken } from "~service"
import { useRouteStore } from "~store"
import Home from "~views/home-page"
import Login from "~views/login"
import Result from "~views/result"

export default () => {
  const { route } = useRouteStore()
  // refreshToken()
  // console.log("refreshing token at start");
  // 每次间隔60s，刷新token
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken()
      console.log("refreshing token");
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [])
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
