import React, { useEffect } from "react"

import { refreshToken } from "~service"
import { useRouteStore } from "~store"
import Home from "~views/home-page"
import Login from "~views/login"
import Result from "~views/result"

export default () => {
  const { route } = useRouteStore()
  // 每次间隔200s，刷新token
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken()
    }, 2000)
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
