import React, { useEffect, useMemo } from "react"

import Input from "~components/Input"
import { useBodyStore, useUnitStore } from "~store"
import { cmToInch, inchToCm } from "~utils"
import { getFromLocalStorage, setToLocalStorage } from "~utils/save"

import style from "./style.module.less"

const dimensions = ["bust", "waist", "hip"]
const Map = {
  bust: "bust",
  waist: "waist",
  hip: "hip"
}
const BodyDimension = ({ body }) => {
  const [bodyData, setBodyData] = React.useState(body)
  const isInputingRef = React.useRef(false)
  console.log("🚀 ~ BodyDimension ~ bodyData:", bodyData)
  const { unit, setUnit } = useUnitStore()


  const bodyValues = useMemo(() => {
    // 为body中某一项为undefined时，该项目不参与转换
    if (unit === "in") {
      const res = {
        bust: cmToInch(parseFloat(bodyData.bust)) || undefined, 
        waist: cmToInch(parseFloat(bodyData.waist)) || undefined,
        hip: cmToInch(parseFloat(bodyData.hip)) || undefined
      }
      setBodyData(res)
    } else {
      const res = {
        bust: inchToCm(parseFloat(bodyData.bust)) || undefined, // Parse string to float
        waist: inchToCm(parseFloat(bodyData.waist)) || undefined, // Parse string to float
        hip: inchToCm(parseFloat(bodyData.hip)) || undefined // Parse string to float
      }
      setBodyData(res)

    }
  }, [unit])
  return (
    <div className={style["measure-wrapper"]}>
      {dimensions.map((item, index) => {
        console.log("🚀 ~ {dimensions.map ~ item:", item)
        return (
          <div className={style["inputContainer"]} key={index}>
            <Input
              onBlur={() => {
                isInputingRef.current = false
                console.log("🚀 ~ {dimensions.map ~ isInputingRef.current:", isInputingRef.current)
              }}
              onFocus={() => {
                isInputingRef.current = true
              }}
              value={bodyData[item]}
              onChange={(e) => {
                isInputingRef.current = true
                setBodyData({
                  ...bodyData,
                  [item]: e.target.value
                })
              }}
              type={item}
              showHelpText={false}
              // showEndAdornment={true}
              placeholder={Map[item]}
            />
          </div>
        )
      })}
    </div>
  )
}
export default BodyDimension
