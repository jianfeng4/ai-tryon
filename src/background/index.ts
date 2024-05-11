import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"

import { getSizeguide, getTryOn } from "~/service"
import { getCurrentTabUrl, getImageBase64WithoutPrefix } from "~/utils"
import { getFromLocalStorage, setToLocalStorage } from "~/utils/save"
import type { TabInfo } from "~type"
import { sendMessageToContent } from "~utils/message"

import "@plasmohq/messaging/background"

import { startHub } from "@plasmohq/messaging/pub-sub"

console.log(`BGSW - Starting Hub`)
startHub()

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "viewImage",
    title: "fAIshion Try-On plasmo",
    contexts: ["all"]
  })
})
// 监听右键菜单项点击事件
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "viewImage" && info.srcUrl) {
    // 保存最后一次右键点击的图片URL
    await setToLocalStorage("lastRightClickedImageSrc", info.srcUrl)
    // 将图片转换为Base64格式并处理
    const model = await getImageBase64WithoutPrefix(info.srcUrl)
    const face = await getFromLocalStorage("face")
    const sence = await getFromLocalStorage("sence")
    sendMessageToContent("showLoading")

    const tryonRes = await getTryOn({
      model,
      face,
      prompt: sence,
      enhanceTryOnData: {
        age: "",
        bodyShape: "fit",
        ethnic: "asian",
        sex: "female",
        skinColor: ""
      }
    })
    if (tryonRes.status === "success") {
      sendMessageToContent("hideLoading")
      let productUrl = "",
        pageTitle = ""
      async function fetchTabDetails() {
        try {
          const tabInfo: TabInfo = await getCurrentTabUrl()
          console.log(tabInfo.url, tabInfo.title, 1111122222)
          productUrl = tabInfo.url
          pageTitle = tabInfo.title
        } catch (error) {
          console.error("Error getting tab info:", error)
        }
      }

      // 调用函数
      await fetchTabDetails()

      const sizeDataRes = await getSizeguide({
        category_id: "bottoms-women",
        product_url: productUrl,
        page_title: pageTitle,
        img_src_url: info.srcUrl
      })
      console.log(sizeDataRes, "res1111")
      sendMessageToContent({
        name: "showTryon",
        params: {
          face: tryonRes.image
        }
      })
      // 换脸成功之后需要去获取尺码表
      // 再去请求server:getSizeguide
      // 当getSizeguide也成功之后，把尺码表的数据和换脸的图片一起传给content，在页面中展示出来
      // sendMessageToContent("showtryOnPopup",{face:xxx,sizeguide:xxx})

      // 如果getSizeguide失败了，还是需要把换脸的图片展示出来
      // sendMessageToContent("showtryOnPopup",{face:xxx})
    } else {
      console.log("处理图片失败")
      // 发送消息给content script，提示换脸失败
      //    给content发送消息，展示错误提示给用户
    }
  } else if (info.menuItemId === "viewImage" && !info.srcUrl) {
    // 如果点击的不是图片，向当前标签页发送消息
    console.log("没有图片URL，向内容脚本发送消息以创建覆盖层")
    chrome.tabs.sendMessage(tab.id, { action: "createOverlay" })
  }
})
// Since Plasmo's default Typescript configuration treats all source files as modules, if you don't have any imports or exports in your code, you'll have to add an export {} line at the start of your file. You will see this warning when creating your first content script!

export {}
