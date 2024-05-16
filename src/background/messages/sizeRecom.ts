import type { PlasmoMessaging } from "@plasmohq/messaging"
import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"

import { getSizeRecommendation } from "~service"
import { getFromLocalStorage } from "~utils/save"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  sendToContentScript({
    name: "showLoading",
    body:{
        loadingText:'Generating size recommendation for you...'
    }
  })
  
  console.log("sizeRecom", req)
  const { screenShoot } = req.body
  const bodyData = await getFromLocalStorage("body")
  try {
    const response = await getSizeRecommendation({
      base64_image: screenShoot,
      body_measurements: JSON.parse(JSON.stringify(bodyData)),
      showing_chart: true,
      tabUrl:''
    })
    console.log(response,'response~~~~~~~~~')
    res.send({
      name: "sizeRecom",
      body: {
        sizeData: response
      }
    })
  }catch(e){
    console.log(e,'error~~~~~~~~~')
  }
//   const response = await getSizeRecommendation({

//   })

}

export default handler
