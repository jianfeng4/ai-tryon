import React, { useEffect, useState } from "react"

import "./style.css" // 样式文件

const Loading = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1
        return newProgress > 100 ? 0 : newProgress
      })
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
    }, 10000) // 10 秒钟后清除定时器

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading-container">
      <div
        className="loading-circle"
        style={{ transform: `rotate(${progress * 3.6}deg)` }}></div>
      <div className="loading-text">{progress}%</div>
    </div>
  )
}

export default Loading
