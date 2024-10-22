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
      <Typography className="Item-index" variant="caption">
        #{index}
      </Typography>
      <Typography>{content}</Typography>
    </div>
  )
}

export default Item
