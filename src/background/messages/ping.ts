import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  // const enhanceRes = await getEnhanceTryOn(req.body)
  console.log("ping", req)
  res.send({
    name: "MyMsg"
  })
}

export default handler
