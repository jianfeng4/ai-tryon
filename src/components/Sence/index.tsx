import TextField from "@mui/material/TextField"
import cls from "classnames"
import React, { useEffect } from "react"

import Input from "~components/Input"
import { useTryOnStore } from "~store"
import { getFromLocalStorage, setToLocalStorage } from "~utils/save"

import style from "./style.module.less"

const Sence = () => {
  useEffect(() => {
    async function getInitialSence() {
      const sence = await getFromLocalStorage("sence")
      if (sence) {
        setSence(sence)
      }
    }
    getInitialSence()
  }, [])
  const tryOnStore = useTryOnStore()
  const { sence, setSence } = tryOnStore
  return (
    <div className={style["container"]}>
      <div className={style["title"]}>Enter your preferred Try-on Scene</div>
      <Input
        value={sence}
        type="sence"
        showHelpText={false}
        showEndAdornment={false}
        placeholder="On the beach"
        style={{
          width: "100%",
          margin: "10px 0px"
        }}
        onChange={(e) => {
          setSence(e.target.value)
          setToLocalStorage("sence", e.target.value)
        }}
      />
    </div>
  )
}
export default Sence
