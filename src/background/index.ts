export {}
// Since Plasmo's default Typescript configuration treats all source files as modules, if you don't have any imports or exports in your code, you'll have to add an export {} line at the start of your file. You will see this warning when creating your first content script!
console.log("HELLO WORLD FROM BGSCRIPTS")
console.log("1111111111111111111111111111111chrome")

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "viewImage",
    title: "fAIshion Try-On",
    contexts: ["all"]
  })
})
// 监听右键菜单项点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "viewImage" && info.srcUrl) {
    // 保存最后一次右键点击的图片URL
    chrome.storage.local.set({ lastRightClickedImageSrc: info.srcUrl })
    // 将图片转换为Base64格式并处理
    console.log(info)
  } else if (info.menuItemId === "viewImage" && !info.srcUrl) {
    // 如果点击的不是图片，向当前标签页发送消息
    console.log("没有图片URL，向内容脚本发送消息以创建覆盖层")
    chrome.tabs.sendMessage(tab.id, { action: "createOverlay" })
  }
})
