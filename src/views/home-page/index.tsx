import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import MenuItem from "@material-ui/core/MenuItem"
import Select from "@material-ui/core/Select"
import { makeStyles } from "@material-ui/core/styles"
import React, { useEffect, useState } from "react"

import Logo from "~assets/logo-purple.png"
// import { useNavigate } from "react-router-dom"

import Header from "~components/Header"
import ImgUploader from "~components/ImgUploader"
import { getUserInfo, logout, refreshToken } from "~service"
import {
  useBodyStore,
  useRouteStore,
  useTryOnStore,
  useUnitStore
} from "~store"
import { cmToInch, inchToCm } from "~utils"

import style from "./style.module.less"

import "./style.less"

import Grid from "@material-ui/core/Grid"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from "@mui/material/OutlinedInput"

import HeaderHover from "~assets/header-hover.png"
import Search from "~assets/search.png"
import Input from "~components/Input"

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
  const { headerUrl, setHeaderUrl } = useTryOnStore()
  const [firstname, setFirstName] = React.useState("")
  const [bodyData, setBodyData] = React.useState({
    bust: 0,
    hip: 0,
    waist: 0
  })
  const { unit, setUnit } = useUnitStore()
  const [hideAvatar, setHideAvatar] = useState(false)
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
        setFirstName(res.first_name)
        setHeaderUrl(res.avatar_url)
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

  const handleLogout = () => {
    logout()
    setRoute("login")
  }
  return (
    <div className={style["home-container"]}>
      <div className={style["header"]}>
        <div className={style["header-logo"]}>
          <img className={style["logo-image"]} src={Logo} alt="" />
          <span className={style["logo-title"]}>DAZZR.AI</span>
        </div>
        <div className={style["header-content"]}>
          <div className={style["text"]}>
            <div className={style["name"]}>hello,{firstname}</div>
            <div className={style["name"]}>Let’s Discover</div>
            <div className={style["name"]}>Your Next Look</div>
            <div className={style["logout-button"]} onClick={handleLogout}>
              Logout
            </div>
          </div>

          <div
            className={style["avatar-container"]}
            style={
              hideAvatar
                ? {
                    position: "relative"
                  }
                : {}
            }
            onMouseEnter={() => {
              setHideAvatar(true)
            }}
            onMouseLeave={() => {
              setHideAvatar(false)
            }}>
            <img
              className={style["avatar"]}
              src={`https://aws-free.voguediffusion.ai/users/image/${headerUrl}`}
              alt=""
              style={hideAvatar ? { opacity: 0.5 } : {}}
            />

            {hideAvatar && (
              <div className={style["change-header"]}>
                <img src={HeaderHover} className={style["hover-icon"]} alt="" />
                <div>Change Photo</div>
                <div className={style["hover-info"]}>
                  {[userInfo.shap, userInfo.age, userInfo.gender].map(
                    (item) => (
                      <div className={style["hover-info-item"]}>{item}</div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Header />
      <div className={style["measure-wrapper"]}>
        {dimensions.map((item, index) => {
          return (
            <div className={style["inputContainer"]} key={index}>
              <Input
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
