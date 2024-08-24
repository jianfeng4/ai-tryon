import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import { useNavigate } from "react-router-dom"

import BodyDimension from "~components/BodyDimension"
import Header from "~components/Header"
import ImgUploader from "~components/ImgUploader"
import { useRouteStore } from "~store"

import "./style.less"

import Input from "~components/Input"

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

  const [account, setAccount] = React.useState("")
  const [password, setPassword] = React.useState("")
  const { route, setRoute } = useRouteStore()
  return (
    <div className="home-container">
      <div className="header">
        <div className="header-content">
          <div className="text">
            <div className="name">hello,ziyi</div>
            <div className="name">Let’s Get Started</div>
          </div>
          <Avatar
            className={classes.large}
            alt="Remy Sharp"
            src="https://ts1.cn.mm.bing.net/th?id=OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
          />
        </div>
      </div>
      <Header />
      <BodyDimension />
      <ImgUploader />
      <div className="button-wrapper">
        <Button
          variant="contained"
          disabled={!account || !password}
          fullWidth={true}
          color="primary"
          onClick={() => {
            setRoute("home")
          }}>
          See All Results
        </Button>
      </div>
    </div>
  )
}
