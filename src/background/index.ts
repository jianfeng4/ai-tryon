import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"

import { getDeals, getSizeGuide, getTryOn } from "~/service"
import { getDomain, getImageBase64WithoutPrefix } from "~/utils"
import { getFromLocalStorage, setToLocalStorage } from "~/utils/save"
import type { TabInfo } from "~type"
import { sendMessageToContent } from "~utils/message"

import "@plasmohq/messaging/background"

import { startHub } from "@plasmohq/messaging/pub-sub"

console.log(`BGSW - Starting Hub`)
startHub()
export function getCurrentTabUrl(): Promise<TabInfo> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const currentTab = tabs[0]
        if (currentTab?.url && currentTab?.title) {
          resolve({
            url: currentTab?.url,
            title: currentTab?.title
          })
        } else {
          reject("Tab lacks URL or title")
        }
      } else {
        reject("No active tab found")
      }
    })
  })
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "viewImage",
    title: "fAIshion Try-On plasmo",
    contexts: ["all"]
  })
})
// 监听右键菜单项点击事件
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const tabUrl = await getCurrentTabUrl()
  console.log(
    "🚀 ~ chrome.contextMenus.onClicked.addListener ~ tabUrl:",
    tabUrl
  )

  if (info.menuItemId === "viewImage" && info.srcUrl) {
    // 保存最后一次右键点击的图片URL
    await setToLocalStorage("lastRightClickedImageSrc", info.srcUrl)
    // 将图片转换为Base64格式并处理
    const model = await getImageBase64WithoutPrefix(info.srcUrl)
    const face = await getFromLocalStorage("face")
    const sence = await getFromLocalStorage("sence")
    const body = await getFromLocalStorage("body")
    if (!face) {
      sendToContentScript({
        name: "showWarning",
        body: {
          text: "Please upload you profile image"
        }
      })
      return
    }
    sendToContentScript({
      name: "showLoading"
    })
    let sizeData = [],
      dealsData = []
    const tryonRes = await getTryOn({
      model,
      face,
      prompt: sence || "",
      // FIX ME: 这里的数据需要从用户输入的数据中获取
      enhanceTryOnData: {
        Age: "",
        BodyShape: "fit",
        Ethnicity: "asian",
        Gender: "female",
        HairStyle: ""
      }
    })
    // 如果换脸成功，但是没有body数据，那就只展示换脸
    if (tryonRes.status === "success") {
      if (!body) {
        sendToContentScript({
          name: "showTryon",
          body: {
            face: tryonRes.image,
            sizeData: sizeData,
            dealsData: dealsData
          }
        })
        return
      }
      // 如果换脸成功且有body
      if (body) {
        try {
          const sizeDataRes = (await getSizeGuide({
            category_id: "bottoms-women",
            product_url: tabUrl?.url,
            page_title: tabUrl?.title,
            img_src_url: info.srcUrl,
            bodyDimensionsIn: JSON.parse(JSON.stringify(body))
          })) as any
          if (sizeDataRes?.length > 0) {
            sizeData = sizeDataRes
          }
        } catch (error) {}

        const dealsRes = (await getDeals({
          domain: getDomain(tabUrl?.url)
        })) as any
        if (dealsRes?.length > 0) {
          dealsData = dealsRes
        }
        sendToContentScript({
          name: "showTryon",
          body: {
            face: tryonRes.image,
            sizeData: sizeData,
            dealsData: dealsData
          }
        })
      }
    } else {
      sendToContentScript({
        name: "showWarning",
        body: {
          text: "Something wrong, please try again latter"
        }
      })
    }
  } else if (info.menuItemId === "viewImage" && !info.srcUrl) {
    // 如果点击的不是图片，向当前标签页发送消息
    console.log("没有图片URL，向内容脚本发送消息以创建覆盖层")
    chrome.tabs.sendMessage(tab.id, { action: "startScreenshot" })
  }
})
// Since Plasmo's default Typescript configuration treats all source files as modules, if you don't have any imports or exports in your code, you'll have to add an export {} line at the start of your file. You will see this warning when creating your first content script!

export {}
