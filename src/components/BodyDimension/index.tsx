import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from "@mui/material/OutlinedInput"
import cls from "classnames"
import React, { useEffect, useMemo } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import AddMeasure from "~components/AddMeasure"
import Input from "~components/Input"
import { useBodyStore, useUnitStore } from "~store"
import { cmToInch, inchToCm } from "~utils"
import { getFromLocalStorage,setToLocalStorage } from "~utils/save"

import style from "./style.module.less"

const dimensions = ["bust", "waist", "hip"]
const Map={
    bust:"Bust",
    waist:"Waist",
    hip:"Hip"
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
            bust: inchToCm(parseFloat(body.bust) || 0), // Parse string to float
            waist: inchToCm(parseFloat(body.waist) || 0), // Parse string to float
            hip: inchToCm(parseFloat(body.hip) || 0) // Parse string to float
        }
        }
    }, [unit, body])
    return (
        <div>
            {dimensions.map((item, index) => {
                return (
                    <div key={index}>
                        <div className={style["title"]}>{Map[item]}</div>
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
                            showEndAdornment={true}
                            placeholder={item}
                            style={{
                                width: "100%",
                            }}
                        />
                    </div>
                )
            })}
            {/* <AddMeasure /> */}
            <div
                style={{
                    height: "70px"
                }}>
            </div>
        </div>
    )
}
export default BodyDimension
