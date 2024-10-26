import Typography from "@mui/material/Typography"
import React from "react"

import style from "./style.module.less"

interface ItemProps {
  index: number | string
  content: string
  className?: string
}

const Item = ({ index, content, className }: ItemProps) => {
  return (
    <div className={style["img-wrapper"]}>
      <img src={content} alt="" />
    </div>
  )
}

export default Item
