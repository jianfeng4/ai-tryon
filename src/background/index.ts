import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"

import { getTryOn } from "~/service"
import { getImageBase64WithoutPrefix } from "~/utils"
import { getFromLocalStorage, setToLocalStorage } from "~/utils/save"

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
  const result = await sendToContentScript({
    name: "updateOverlay",
    body: {
      image: 1
    }
  })
  if (info.menuItemId === "viewImage" && info.srcUrl) {
    // 保存最后一次右键点击的图片URL
    await setToLocalStorage("lastRightClickedImageSrc", info.srcUrl)
    // 将图片转换为Base64格式并处理
    const model = await getImageBase64WithoutPrefix(info.srcUrl)
    const face = await getFromLocalStorage("face")
    const sence = await getFromLocalStorage("sence")
    const res = await getTryOn({
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
    if (res.status === "success") {
      const result = await sendToContentScript({
        name: "updateOverlay",
        body: {
          image: res.image
        }
      })
    } else {
      console.log("处理图片失败")
      // 发送消息给content script，提示处理图片失败
      chrome.tabs.sendMessage(tab.id, {
        action: "updateOverlay",
        image: null
      })
    }
  } else if (info.menuItemId === "viewImage" && !info.srcUrl) {
    // 如果点击的不是图片，向当前标签页发送消息
    console.log("没有图片URL，向内容脚本发送消息以创建覆盖层")
    chrome.tabs.sendMessage(tab.id, { action: "createOverlay" })
  }
})
// Since Plasmo's default Typescript configuration treats all source files as modules, if you don't have any imports or exports in your code, you'll have to add an export {} line at the start of your file. You will see this warning when creating your first content script!

export {}
