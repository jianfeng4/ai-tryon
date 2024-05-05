import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import cls from "classnames"
import React, { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { useTabStore, useUnitStore } from "~store"
import { TAB } from "~type"
import { getFromLocalStorage } from "~utils/save"

import style from "./style.module.less"

const Header = () => {
  const tabStore = useTabStore()
  const { activeTab, setActiveTab } = tabStore
  const { unit, setUnit } = useUnitStore()
  useEffect(() => {
    async function getInitialUnit() {
      const unit = await getFromLocalStorage("unit")
      if (unit) {
        setUnit(unit as "cm" | "in")
      }
    }
    getInitialUnit()
  }, [])
  return (
    <div>
      <div className={style["header"]}>
        <div className={style["product_name"]}>fAIshion</div>
        <div className={style["login_button"]}>login</div>
      </div>
      <div className={style["sub-header"]}>
        <div className={style["title"]}>
          {activeTab === TAB.TRY_ON ? "Virtual Try-on" : "Size Recommendation"}
        </div>
        <div
          style={{
            display: activeTab === TAB.TRY_ON ? "none" : "block"
          }}>
          <FormControlLabel
            value="unit"
            control={
              <Switch
                checked={unit === "cm"}
                onChange={() => {
                  setUnit(unit === "cm" ? "in" : "cm")
                }}
                color="primary"
              />
            }
            label="CM"
            labelPlacement="end"
            style={{
              marginTop: "18px",
              marginLeft: "10px",
              marginRight: "0"
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default Header
