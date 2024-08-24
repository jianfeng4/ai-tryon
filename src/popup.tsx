import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"
import CloseIcon from "@mui/icons-material/Close"
import Alert from "@mui/material/Alert"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useEffect, useState } from "react"
import { MemoryRouter } from "react-router-dom"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import SizeRecommendationButton from "~components/Button"
import { Routing } from "~routes"
import { useTabStore } from "~store"

import BodyDimension from "./components/BodyDimension"
import DefaultImgBox from "./components/DefaultImgBox"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ImgLoader from "./components/ImgUploader"
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"
import Sence from "./components/Sence"
// or
import "./style.less"

import React from "react"

import { TAB } from "~type"

const domain = "dev-ddvchgamoldzunzy.us.auth0.com"
const clientId = "3iODCuBcWsBWJb8Y27uFKEYNxtAhadcw"

// The code above will copy the data to Web localStorage when used with content scripts or extension pages.
function IndexPopup() {
  const tabStore = useTabStore()
  const { activeTab, setActiveTab } = tabStore
  const [open, setOpen] = useState(true)
  const [data, setData] = useState("")

  const [tabValue, setTabValue] = useState("one")

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    loginWithPopup,
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    getIdTokenClaims
  } = useAuth0()
  const [userName, setUserName] = useState("")
  useEffect(() => {
    chrome.cookies.get(
      {
        url: `http://localhost:3000/`,
        name: `token`
      },
      function (cookie) {
        console.log(cookie, 5555555)
        if (cookie) {
          const my_string = decodeURIComponent(cookie.value)
          console.log(my_string, 666666)
          setUserName(my_string)
        } else {
        }
      }
    )
    console.log(isAuthenticated, user, 8888888)
  }, [isAuthenticated])
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }
  return (
    <Auth0Provider domain={domain} clientId={clientId}>
      <div className="container">
        <div className="footer">
          <Footer />
        </div>
        <div className="main">
          <Header />
          <div
            style={{
              display: activeTab === TAB.TRY_ON ? "block" : "none"
            }}>
            <ImgLoader />
            <DefaultImgBox />
            <Sence />
          </div>
          <div
            style={{
              display: activeTab === TAB.SIZE ? "block" : "none"
            }}>
            <BodyDimension />
          </div>
          {activeTab === TAB.SIZE && <SizeRecommendationButton />}
        </div>

        <div className="">
          <div className="cor_name">VogueDiffusion</div>
        </div>
      </div>
    </Auth0Provider>
  )
}

export default IndexPopup
