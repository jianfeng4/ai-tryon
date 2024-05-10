import cssText from "data-text:~/components/content/Loading/style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"

import { useMessage } from "@plasmohq/messaging/hook"

import Loading from "~components/content/Loading"

export const config: PlasmoCSConfig = {
  all_frames: true
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
const QueryTextAnywhere = () => {
  const [show, setShow] = useState(false)
  useMessage<string, string>(async (req, res) => {
    const { name } = req
    if (name === "showLoading") {
      setShow(true)
    }
    // res.send(document.querySelector(req.body).textContent)
  })
  return (
    <>
      {show ? (
        <Loading loadingText={"Generating Virtual Try-On, Please Wait..."} />
      ) : null}
    </>
  )
}

export default QueryTextAnywhere
