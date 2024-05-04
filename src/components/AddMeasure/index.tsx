import cls from "classnames"
import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { useTabStore } from "~store"
import { TAB } from "~type"

import style from "./style.module.less"

const AddMeasure = () => {
  const tabStore = useTabStore()
  const { activeTab, setActiveTab } = tabStore
  return (
    <div className={style.container}>
      <span>Add Measurements</span>
    </div>
  )
}
export default AddMeasure
