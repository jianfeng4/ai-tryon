import Typography from "@mui/material/Typography"
import React from "react"

interface ItemProps {
  index: number | string
  content: string
  className?: string
  style?: React.CSSProperties
}

const Item = ({ index, content, className, style }: ItemProps) => {
  return (
    <div className={`Item ${className ? className : ""}`} style={style}>
      <div
        style={{
          height: 300,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, .1)",
          borderRadius: 10,
          backgroundImage: "linear-gradient(to right, #00c6ff 0%, #0072ff 100%)"
        }}>
        <img src={content} alt="" />
      </div>
    </div>
  )
}

export default Item
