import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from "@mui/material/OutlinedInput"
import cls from "classnames"
import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import AddMeasure from "~components/AddMeasure"
import Input from "~components/Input"

import style from "./style.module.less"

const dimentions = ["bust", "waist", "hip"]
const BodyDimention = () => {
  return (
    <div>
      {dimentions.map((item) => {
        return (
          <div>
            <div className={style["title"]}>{item}</div>
            <Input
              type={item}
              showHelpText={false}
              shwoEndAdornment={true}
              palceholder={item}
              style={{
                width: "100%"
              }}
            />
          </div>
        )
      })}
      {/* <AddMeasure /> */}
      <div
        style={{
          height: "70px"
        }}></div>
    </div>
  )
}
export default BodyDimention
