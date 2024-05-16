import type { PlasmoMessaging } from "@plasmohq/messaging"
import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"

import { getTryOn } from "~service"
import { getFromLocalStorage } from "~utils/save"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  // sendToContentScript({
  //   name: "addLoading"
  // })
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
    res.send({
      name: "enhanceTryon",
      body: {
        image
      }
    })
    // sendToContentScript({
    //   name: "showTryon",
    //   body: {
    //     face: image
    //   }
    // })
  }
}

export default handler
