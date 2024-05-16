import React, { useEffect, useState } from "react"

interface LoadingPopupProps {
  loadingText: string
  duration?: number // Duration in milliseconds, default is 10 seconds
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({
  loadingText,
  duration = 10000
}) => {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 99) {
          clearInterval(intervalId)
          return prevProgress
        }
        return prevProgress + 1
      })
    }, duration / 100) // Calculate interval to increment progress

    return () => clearInterval(intervalId)
  }, [duration])

  return (
    <div className="popupContainer">
      <div className="spinnerContainer">
        <div className="spinner" />
        <div className="progressText">{progress}%</div>
      </div>
      <div className="spinnerText">{loadingText}</div>
    </div>
  )
}

export default LoadingPopup
