import type { PlasmoMessaging } from "@plasmohq/messaging"

import { sendMessageToContent } from "~utils/message"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  sendMessageToContent("showLoading")
  console.log("Sending message to content script")
  console.log("ping", req)
  res.send({
    name: "MyMsg"
  })
}

export default handler
