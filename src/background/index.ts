import { getTryOn } from "~/service"
import { getImageBase64 } from "~/utils"
import { getFromLocalStorage, setToLocalStorage } from "~/utils/save"

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
    const model = await getImageBase64(info.srcUrl)
    const face = await getFromLocalStorage("face")
    const newFace = face.replace("data:image/jpeg;base64,", "")
    const newModel = model.replace("data:image/jpeg;base64,", "")
    const res = await getTryOn({
      model: newModel,
      face: newFace,
      prompt: "on the street",
      enhanceTryOnData: {
        age: "",
        bodyShape: "fit",
        ethnic: "asian",
        sex: "female",
        skinColor: ""
      }
    })
    console.log(res, "res")
    console.log(111, model, 222, face)
  } else if (info.menuItemId === "viewImage" && !info.srcUrl) {
    // 如果点击的不是图片，向当前标签页发送消息
    console.log("没有图片URL，向内容脚本发送消息以创建覆盖层")
    chrome.tabs.sendMessage(tab.id, { action: "createOverlay" })
  }
})
// Since Plasmo's default Typescript configuration treats all source files as modules, if you don't have any imports or exports in your code, you'll have to add an export {} line at the start of your file. You will see this warning when creating your first content script!

export {}
