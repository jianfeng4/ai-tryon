import cls from "classnames"
import React from "react"

import Sizing from "~assets/sizing-black.svg"
import SizingSelect from "~assets/sizing.svg"
import TryOn from "~assets/try-on-black.svg"
import TryOnSelect from "~assets/try-on.svg"
import { useTabStore } from "~store"
import { TAB } from "~type"

import style from "./style.module.less"

const Footer = () => {
  const tabStore = useTabStore()
  const { activeTab, setActiveTab } = tabStore
  const isInTryOn = activeTab === TAB.TRY_ON
  return (
    <div className={style.footer}>
      <div
        className={cls(style["tab"], {
          [style["select"]]: isInTryOn
        })}
        onClick={() => {
          setActiveTab(TAB.TRY_ON)
        }}>
        <img src={isInTryOn ? TryOnSelect : TryOn} alt="" />
        <span>Try-on</span>
      </div>
      <div
        className={cls(style["tab"], {
          [style["select"]]: !isInTryOn
        })}
        onClick={() => {
          setActiveTab(TAB.SIZE)
        }}>
        <img src={isInTryOn ? Sizing : SizingSelect} alt="" />
        <span>Sizing</span>
      </div>
    </div>
  )
}
export default Footer
