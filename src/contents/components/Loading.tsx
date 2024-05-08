import cssText from "data-text:~/components/Loading/style.css"
import type { PlasmoCSConfig } from "plasmo"

import { useMessage } from "@plasmohq/messaging/hook"

import Loading from "~components/Loading"

export const config: PlasmoCSConfig = {
  all_frames: true
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
const QueryTextAnywhere = () => {
  const { data } = useMessage<string, string>(async (req, res) => {
    // console.log(req.body, req, 11111)
    console.log(222222, req)
    // res.send(document.querySelector(req.body).textContent)
  })
  return (
    <div
      style={{
        padding: 8,
        background: "#333",
        color: "red"
      }}>
      Querying Selector for111121212121212123edsfcsdfsdfsdf: {data}
      <Loading />
    </div>
  )
}

export default QueryTextAnywhere
