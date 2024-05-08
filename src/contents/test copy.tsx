import type { PlasmoCSConfig } from "plasmo"

import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  all_frames: true
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
        color: "red",
        marginTop: 10
      }}>
      Querying Selector for1112222: {data}
    </div>
  )
}

export default QueryTextAnywhere
