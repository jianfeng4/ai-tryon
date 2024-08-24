import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
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

  const handleUnit = (event, newUnit) => {
    if (newUnit !== null) {
      console.log(newUnit)
      setUnit(newUnit)
    }
  }

  return (
    <div>
      <div className={style["sub-header"]}>
        <div className={style["title"]}>
          {activeTab === TAB.TRY_ON ? "Enter Measure" : "Size Recommendation"}
        </div>
        <div
        // style={{
        //     display: activeTab === TAB.TRY_ON ? "none" : "block"
        // }}
        >
          <ToggleButtonGroup
            value={unit}
            exclusive // make sure only one toggle button can be selected at a time
            onChange={handleUnit}
            aria-label="unit measurement" // for accessibility
            className={style["toggle-button-group"]}
            style={{
              marginTop: "18px",
              marginLeft: "10px",
              marginRight: "0"
            }}>
            <ToggleButton
              value="in"
              aria-label="Inch"
              className={style["toggle-button"]}>
              IN
            </ToggleButton>
            <ToggleButton
              value="cm"
              aria-label="Centimeter"
              className={style["toggle-button"]}>
              CM
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </div>
  )
}
export default Header
