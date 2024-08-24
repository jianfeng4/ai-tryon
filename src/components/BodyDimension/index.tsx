import React, { useEffect, useMemo } from "react"

import Input from "~components/Input"
import { useBodyStore, useUnitStore } from "~store"
import { cmToInch, inchToCm } from "~utils"
import { getFromLocalStorage, setToLocalStorage } from "~utils/save"

import style from "./style.module.less"

const dimensions = ["Bust", "Waist", "Hips"]
const Map = {
  Bust: "Bust",
  Waist: "Waist",
  Hips: "Hips"
}
const BodyDimension = () => {
  const { body, setBody } = useBodyStore()
  const { unit, setUnit } = useUnitStore()
  useEffect(() => {
    async function getInitialBody() {
      const body = await getFromLocalStorage("body")
      if (body) {
        console.log(body, "body")
        setBody(JSON.parse(JSON.stringify(body)))
      }
    }
    getInitialBody()
  }, [])

  const bodyValues = useMemo(() => {
    // 为body中某一项为undefined时，该项目不参与转换
    if (unit === "in") {
      return body
    } else {
      return {
        Bust: inchToCm(parseFloat(body.Bust) || 0), // Parse string to float
        Waist: inchToCm(parseFloat(body.Waist) || 0), // Parse string to float
        Hips: inchToCm(parseFloat(body.Hips) || 0) // Parse string to float
      }
    }
  }, [unit, body])
  return (
    <div className={style["measure-wrapper"]}>
      {dimensions.map((item, index) => {
        return (
          <div className={style["inputContainer"]} key={index}>
            <Input
              value={body[item] ? bodyValues[item] : body[item]}
              onChange={(e) => {
                setBody({
                  ...body,
                  [item]: e.target.value
                })
                setToLocalStorage("body", {
                  ...body,
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
      {/* <AddMeasure /> */}
      <div
        style={{
          height: "70px"
        }}></div>
    </div>
  )
}
export default BodyDimension
