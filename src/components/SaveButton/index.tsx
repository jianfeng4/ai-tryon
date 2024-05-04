import cls from "classnames"
import React from "react"

import { useTabStore } from "~store"
import { TAB } from "~type"

import style from "./style.module.less"

const SaveButton = () => {
  return (
    <div className={style.container}>
      <div className={style.button}>
        <span>Save</span>
      </div>
    </div>
  )
}
export default SaveButton
