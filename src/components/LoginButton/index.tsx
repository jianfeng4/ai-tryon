import { useAuth0 } from "@auth0/auth0-react"
import React from "react"

import loading from "../assets/loading.svg"

const Loading = () => {
  const { user, isAuthenticated, loginWithRedirect, logout, loginWithPopup } =
    useAuth0()

  return <button onClick={() => loginWithPopup()}>login</button>
}
export default Loading
