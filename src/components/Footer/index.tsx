import cls from "classnames"
import React from "react"

import { useTabStore } from "~store"
import { TAB } from "~type"

import style from "./style.module.less"

const Footer = () => {
  const tabStore = useTabStore()
  const { activeTab, setActiveTab } = tabStore
  return (
    <div className={style.footer}>
      <div
        className={cls(style["tab"], {
          [style["select"]]: activeTab === TAB.TRY_ON
        })}
        onClick={() => {
          setActiveTab(TAB.TRY_ON)
        }}>
        try on
      </div>
      <div
        className={cls(style["tab"], {
          [style["select"]]: activeTab === TAB.SIZE
        })}
        onClick={() => {
          setActiveTab(TAB.SIZE)
        }}>
        size
      </div>
    </div>
  )
}
export default Footer
