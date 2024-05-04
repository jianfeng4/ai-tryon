import TextField from "@mui/material/TextField"
import cls from "classnames"
import React from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import Input from "~components/Input"

import style from "./style.module.less"

const Sence = () => {
  const [sence, setSence, { setRenderValue, setStoreValue, remove }] =
    useStorage({
      key: "sence",
      instance: new Storage({
        area: "local"
      })
    })
  return (
    <div className={style["container"]}>
      <div className={style["title"]}>AI Background Generation</div>
      <Input
        // value={sence}
        type="sence"
        showHelpText={false}
        shwoEndAdornment={false}
        palceholder="Input your preferred try-on scene"
        style={{
          width: "100%",
          margin: "16px 0px"
        }}
        // onChange={(e) => {
        //   setSence(e.target.value)
        //   console.log(e.target.value, 2222)
        // }}
      />
      {/* <button onClick={() => setStoreValue()}>Save</button> */}
    </div>
  )
}
export default Sence
