import cls from "classnames"
import React from "react"

import style from "./style.module.less"

const Footer = () => {
  return (
    <div className={style["header"]}>
      <div className={style["product_name"]}>fAIshion</div>
      <div className={style["login_button"]}>Log in</div>
    </div>
  )
}
export default Footer
