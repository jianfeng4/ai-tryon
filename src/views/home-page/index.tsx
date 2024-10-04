import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { makeStyles } from "@material-ui/core/styles"
import OutlinedInput from "@mui/material/OutlinedInput"
import React, { useEffect, useState } from "react"

import Search from "~assets/search.png"
import CustomInput from "~components/CustomInput"
import CustomToggleButton from "~components/CustomToggleButton"
import ImgUploader from "~components/ImgUploader"
import { getUserInfo, logout, refreshToken } from "~service"
import {
  useBodyStore,
  useRouteStore,
  useTryOnStore,
  useUnitStore
} from "~store"
import { cmToInch, inchToCm } from "~utils"

import Header from "./Header"
import style from "./style.module.less"

const dimensions = ["bust", "waist", "hip"]
const Map = {
  bust: "bust",
  waist: "waist",
  hip: "hip"
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  select: {
    width: 80,
    height: "4vh",
    borderRadius: 20,
    background: "#F4F4F4",
    fontSize: 14
  },
  menuItem: {
    width: 80,
    height: 30,
    fontSize: 14
  },
  input: {
    fontSize: 12, // 设置字体大小
    borderRadius: 4, // 设置边框圆角
    "&::placeholder": {
      color: "red", // 设置 placeholder 颜色
      fontSize: 12 // 设置 placeholder 字体大小
    },
    "&:focus": {
      borderColor: theme.palette.primary.main, // 聚焦时的边框颜色
      outline: "none" // 去掉默认的聚焦边框
    }
  }
}))

export default () => {
  const classes = useStyles()
  const { route, setRoute } = useRouteStore()
  const [bodyData, setBodyData] = React.useState({
    bust: 0,
    hip: 0,
    waist: 0
  })
  const { unit, setUnit } = useUnitStore()
  const [userInfo, setUserInfo] = useState({})
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
      console.log(res, "userinfo")
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
  return (
    <div className={style["home-container"]}>
      <Header userInfo={userInfo} />
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

      <div className={style["scenario-container"]}>
        <Select
          variant="outlined"
          // value={age}
          // onChange={handleChange}
          displayEmpty
          // className={{}}
          className={classes.select} // 注意这里使用的是 classes.large，不是 style['large']
          defaultValue={"light"}
          inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value={"light"}>Light</MenuItem>
          <MenuItem value={"dark"}>Dark</MenuItem>
        </Select>

        <OutlinedInput
          // type={inputType}
          // value={value}
          fullWidth={true}
          // onChange={onChange}
          placeholder={"Enter Your Try-On Scenario"}
          endAdornment={<img src={Search} className={style["search"]}></img>}
          className={classes.input} // 注意这里使用的是 classes.large，不是 style['large']
          style={{
            borderRadius: "20px",
            borderColor: "black",
            background: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0px 4px 50px 0px rgba(0, 0, 0, 0.10)",
            height: "4vh",
            width: "100%",
            ...style
          }}
        />
      </div>

      <div className={style["button-wrapper"]}>
        <Button
          style={{
            borderRadius: 20,
            width: 320,
            marginTop: "2.7vh"
          }}
          children={
            <span style={{ textTransform: "none" }}>See All Results</span>
          }
          variant="contained"
          fullWidth={true}
          color="primary"
          onClick={() => {
            setRoute("result")
          }}></Button>
      </div>
    </div>
  )
}
