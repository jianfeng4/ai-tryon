import cls from "classnames"
import React from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { useTabStore, useTryOnStore } from "~store"
import { TAB } from "~type"
import { setToLocalStorage } from "~utils/save"

import style from "./style.module.less"

const SaveButton = () => {
  const { base64Result, setBase64Result, sence, setSence } = useTryOnStore()
  const { activeTab, setActiveTab } = useTabStore()
  const handleClick = async () => {
    if (activeTab === TAB.TRY_ON) {
      if (!base64Result) {
        alert("Please upload a photo first")
        return
      }
      await setToLocalStorage("face", base64Result)
      await setToLocalStorage("sence", sence)
      alert(
        "Saved successfully! Right-click on any model picture to try on virtually"
      )
    } else {
    }
  }
  return (
    <div className={style.container} onClick={handleClick}>
      <div className={style.button}>
        <span>Save</span>
      </div>
    </div>
  )
}
export default SaveButton
