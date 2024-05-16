import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"

import { getDeals, getSizeGuide, getTryOn } from "~/service"
import { getImageBase64WithoutPrefix } from "~/utils"
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
    sendToContentScript({
      name: "showLoading"
    })

    const tryonRes = await getTryOn({
      model,
      face,
      prompt: sence || "",
      // FIX ME: 这里的数据需要从用户输入的数据中获取
      enhanceTryOnData: {
        age: "",
        bodyShape: "fit",
        ethnic: "asian",
        sex: "female",
        skinColor: ""
      }
    })
    if (tryonRes.status === "success") {
      getSizeGuide({
        category_id: "bottoms-women",
        product_url: tabUrl?.url,
        page_title: tabUrl?.title,
        img_src_url: info.srcUrl,
        bodyDimensionsIn: JSON.parse(JSON.stringify(body))
      })
        .then((sizeDataRes) => {
          console.log("background,etSizeGuide")
          sendToContentScript({
            name: "hideLoading"
          })
          sendToContentScript({
            name: "showTryon",
            body: {
              face: tryonRes.image,
              sizeData: [
                {
                  Bust: { value: "31", highlight: false },
                  Hips: { value: "31-32", highlight: true },
                  Size: { value: "XXS", highlight: false },
                  Waist: { value: "22-23", highlight: false }
                },
                {
                  Bust: { value: "32", highlight: true },
                  Hips: { value: "33-34", highlight: false },
                  Size: { value: "XS", highlight: false },
                  Waist: { value: "24-25", highlight: false }
                },
                {
                  Bust: { value: "34-35", highlight: false },
                  Hips: { value: "35-37", highlight: false },
                  Size: { value: "S", highlight: true },
                  Waist: { value: "25-26", highlight: false }
                },
                {
                  Bust: { value: "42-45", highlight: false },
                  Hips: { value: "46-48", highlight: false },
                  Size: { value: "XXL", highlight: false },
                  Waist: { value: "35", highlight: true }
                }
              ]
            }
          })
        })
        .then(async () => {
          const dealsRes = await getDeals({
            domain: tabUrl?.url
          }).then((deals) => {
            console.log("deals", deals)
            sendToContentScript({
              name: "showTryon",
              body: {
                face: tryonRes.image,
                sizeData: [
                  {
                    Bust: { value: "31", highlight: false },
                    Hips: { value: "31-32", highlight: true },
                    Size: { value: "XXS", highlight: false },
                    Waist: { value: "22-23", highlight: false }
                  },
                  {
                    Bust: { value: "32", highlight: true },
                    Hips: { value: "33-34", highlight: false },
                    Size: { value: "XS", highlight: false },
                    Waist: { value: "24-25", highlight: false }
                  },
                  {
                    Bust: { value: "34-35", highlight: false },
                    Hips: { value: "35-37", highlight: false },
                    Size: { value: "S", highlight: true },
                    Waist: { value: "25-26", highlight: false }
                  },
                  {
                    Bust: { value: "42-45", highlight: false },
                    Hips: { value: "46-48", highlight: false },
                    Size: { value: "XXL", highlight: false },
                    Waist: { value: "35", highlight: true }
                  }
                ],
                dealsData: dealsRes
              }
            })
          })
        })
    } else {
      console.log("处理图片失败")
      // 发送消息给content script，提示换脸失败
      //    给content发送消息，展示错误提示给用户
    }
  } else if (info.menuItemId === "viewImage" && !info.srcUrl) {
    // 如果点击的不是图片，向当前标签页发送消息
    console.log("没有图片URL，向内容脚本发送消息以创建覆盖层")
    chrome.tabs.sendMessage(tab.id, { action: "startScreenshot" })
  }
})
// Since Plasmo's default Typescript configuration treats all source files as modules, if you don't have any imports or exports in your code, you'll have to add an export {} line at the start of your file. You will see this warning when creating your first content script!

export {}
