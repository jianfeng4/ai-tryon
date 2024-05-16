import cls from "classnames"
import React from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { useBodyStore, useTabStore, useTryOnStore, useUnitStore } from "~store"
import { TAB } from "~type"
import { setToLocalStorage } from "~utils/save"
import {captureScreen} from "~utils"
import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"

import style from "./style.module.less"

const SaveButton = () => {
  const { body, setBody } = useBodyStore()
  const handleClick = async () => {
    if (!body.bust || !body.waist || !body.hip) {
          alert("Please fill in all the measurements")
          return
        }
    captureScreen().then((screenShoot)=>{
      sendToBackground({
        name:'sizeRecom',
        body:{
          screenShoot
        }
      })
    })

  }
  return (
    <div className={style.container} onClick={handleClick}>
      <div className={style.button}>
        <span>Size Recommendation</span>
      </div>
    </div>
  )
}
export default SaveButton
