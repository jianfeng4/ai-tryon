import cls from "classnames"
import React from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { useBodyStore, useTabStore, useTryOnStore, useUnitStore } from "~store"
import { TAB } from "~type"
import { setToLocalStorage } from "~utils/save"

import style from "./style.module.less"

const SaveButton = () => {
  const { base64Result, setBase64Result, sence, setSence } = useTryOnStore()
  const { body, setBody } = useBodyStore()
  const { activeTab, setActiveTab } = useTabStore()
  const { unit, setUnit } = useUnitStore()
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
      if (body.bust === "" || body.waist === "" || body.hip === "") {
        alert("Please fill in all the measurements")
        return
      }
      await setToLocalStorage("body", body)
      await setToLocalStorage("unit", unit)
      alert(
        "Saved successfully! Please open the size chart on the website, keep the size chart open, and then click the Size Recommendation"
      )
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
