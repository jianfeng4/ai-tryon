import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"

import { useTabStore } from "~store"

import Footer from "./components/Footer"
import Header from "./components/Header"
import LoginButton from "./components/LoginButton"
import LogoutButton from "./components/LogoutButton"

import "./style.less"

const domain = "dev-ddvchgamoldzunzy.us.auth0.com"
const clientId = "3iODCuBcWsBWJb8Y27uFKEYNxtAhadcw"

function IndexPopup() {
  const tabStore = useTabStore()
  const { activeTab, setActiveTab } = tabStore
  const [data, setData] = useState("")
  const { user, isAuthenticated, loginWithRedirect, logout, loginWithPopup } =
    useAuth0()
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

  return (
    <Auth0Provider domain={domain} clientId={clientId}>
      <div className="container">
        <div className="main">
          <Header />
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </Auth0Provider>
  )
}

export default IndexPopup
