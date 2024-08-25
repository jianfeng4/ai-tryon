import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { useNavigate } from "react-router-dom"

import BodyDimension from "~components/BodyDimension"
import Header from "~components/Header"
import ImgUploader from "~components/ImgUploader"
import Input from "~components/Input"
import { useRouteStore } from "~store"

import style from "./style.module.less"

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
  }
}))
export default () => {
  const classes = useStyles()
  const { route, setRoute } = useRouteStore()
  return (
    <div className={style["home-container"]}>
      <div className={style["header"]}>
        <div className={style["header-content"]}>
          <div className={style["text"]}>
            <div className={style["name"]}>hello,ziyi</div>
            <div className={style["name"]}>Let’s Get Started</div>
          </div>
          <Avatar
            alt="Remy Sharp"
            src="https://ts1.cn.mm.bing.net/th?id=OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
            className={classes.large} // 注意这里使用的是 classes.large，不是 style['large']
          />
        </div>
      </div>
      <Header />
      <BodyDimension />
      <div className={style["line1"]} />

      <ImgUploader />
      <div className={style["button-wrapper"]}>
        <Button
          style={{
            borderRadius: 20
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
