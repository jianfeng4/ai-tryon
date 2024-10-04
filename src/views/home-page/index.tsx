import { SearchOutlined } from "@ant-design/icons"
import { Card, Space } from "antd"
import GenerateIcon from "assets/GenerateIcon"
import LightIcon from "assets/LightIcon"
import SuccessIcon from "assets/SuccessIcon"
import React, { useEffect, useState } from "react"

import Search from "~assets/search.png"
import CustomButton from "~components/CustomButton"
import CustomInput from "~components/CustomInput"
import CustomToggleButton from "~components/CustomToggleButton"
import ImgUploader from "~components/ImgUploader"
import { getUserInfo, logout, refreshToken } from "~service"
import {
  useBodyStore,
  useRouteStore,
  useTryOnStore,
  useUnitStore,
  useUserInfoStore
} from "~store"
import { cmToInch, inchToCm } from "~utils"

import Header from "./components/Header"
import LightChoose from "./components/LightChoose"
import style from "./style.module.less"

const dimensions = ["bust", "waist", "hip"]
const Map = {
  bust: "bust",
  waist: "waist",
  hip: "hip"
}

export default () => {
  const { route, setRoute } = useRouteStore()
  const { userInfo, setUserInfo } = useUserInfoStore()
  const [bodyData, setBodyData] = React.useState({
    bust: 0,
    hip: 0,
    waist: 0
  })
  const { unit, setUnit } = useUnitStore()
  const [generating, setGenerating] = useState(false)
  const [success, setSuccess] = useState(false)
  React.useEffect(() => {
    // 为body中某一项为undefined时，该项目不参与转换
    if (unit === "in") {
      const res = {
        bust: cmToInch(parseFloat(bodyData?.bust)) || undefined,
        waist: cmToInch(parseFloat(bodyData?.waist)) || undefined,
        hip: cmToInch(parseFloat(bodyData?.hip)) || undefined
      }
      setBodyData(res)
    } else {
      const res = {
        bust: inchToCm(parseFloat(bodyData?.bust)) || undefined, // Parse string to float
        waist: inchToCm(parseFloat(bodyData?.waist)) || undefined, // Parse string to float
        hip: inchToCm(parseFloat(bodyData?.hip)) || undefined // Parse string to float
      }
      setBodyData(res)
    }
  }, [unit])
  useEffect(() => {
    const fetchUserInfo = async () => {
      await refreshToken()
      const res = await getUserInfo()
      setUserInfo(res)
      if (res) {
        const bodyData = {
          bust: Number(res.bust),
          hip: Number(res.hip),
          waist: Number(res.waist)
        }
        setBodyData(bodyData)
      } else {
        logout()
        setRoute("login")
      }
    }
    fetchUserInfo()
  }, [])
  const handleGenerate = async () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setSuccess(true)
    }, 3000)
  }

  return (
    <div className={style["home-container"]}>
      <Header />
      <CustomToggleButton />
      <div className={style["measure-wrapper"]}>
        {dimensions.map((item, index) => {
          return (
            <div className={style["inputContainer"]} key={index}>
              <CustomInput
                value={bodyData?.[item]}
                onChange={(e) => {
                  setBodyData({
                    ...bodyData,
                    [item]: e.target.value
                  })
                }}
                type={item}
                showHelpText={false}
                placeholder={Map[item]}
                myStyle={{
                  height: "4vh"
                }}
              />
            </div>
          )
        })}
      </div>

      <div className={style["line1"]} />

      <ImgUploader />

      <LightChoose />
      <Space
        direction="vertical"
        size={20}
        style={{
          width: "100%"
        }}>
        <CustomButton
          loading={generating}
          onClick={() => {
            handleGenerate()
          }}
          myStyle={
            success
              ? {
                  backgroundColor: "#4D4DDE",
                  boxShadow: "none"
                }
              : {}
          }
          buttonText={
            !generating ? (
              <div
                style={{
                  margin: "auto"
                }}>
                {!success ? "Generate" : "Image Successfully Generated !"}
              </div>
            ) : null
          }
          iconPosition="end"
          icon={
            generating ? null : !success ? <GenerateIcon /> : <SuccessIcon />
          }
        />
        <CustomButton
          onClick={() => {
            setRoute("result")
          }}
          buttonText={"See all results"}
          myStyle={{
            color: "#000",
            fontWeight: "bold",
            backgroundColor: "#F4F4F4",
            boxShadow: "none"
          }}
        />
      </Space>
    </div>
  )
}
