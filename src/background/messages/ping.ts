import type { PlasmoMessaging } from "@plasmohq/messaging"

import { getTryOn } from "~service"
import { sendMessageToContent } from "~utils/message"
import { getFromLocalStorage } from "~utils/save"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  sendMessageToContent("showLoading")
  console.log("_enhance_truon")
  console.log("ping", req)
  const { enhanceTryOnData, captureBase64 } = req.body
  const response = await getTryOn({
    face: await getFromLocalStorage("face"),
    model:
      captureBase64 || (await getFromLocalStorage("lastRightClickedImageSrc")),
    prompt: (await getFromLocalStorage("sence")) || "",
    enhanceTryOnData:
      enhanceTryOnData || (await getFromLocalStorage("enhanceTryOnData"))
  })
  const { image, status } = response
  if (status === "success") {
    sendMessageToContent("hideLoading")
    res.send({
      name: "TryOn",
      body: {
        image
      }
    })
  }
}

export default handler
