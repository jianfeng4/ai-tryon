import cls from "classnames"
import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import style from "./style.module.less"

const Footer = () => {
  const [hailingFrequency] = useStorage("hailing")
  return (
    <div className={style["header"]}>
      <div className={style["product_name"]}>fAIshion</div>
      <div className={style["login_button"]}>{hailingFrequency}</div>
    </div>
  )
}
export default Footer
