import type { PlasmoMessaging } from "@plasmohq/messaging"

import { sendMessageToContent } from "~utils/message"

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  // console.log(req)
  // sendMessageToContent("showLoading")
  console.log("Sending message to content script")
  res.send({
    message: "Hello from port handler"
  })
}

export default handler
