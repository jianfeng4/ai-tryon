import type { TabInfo } from "~type"

export function getImageBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string) // This is the data URL
        reader.readAsDataURL(blob)
      })
      .catch((error) => reject(error))
  })
}
export async function getImageBase64WithoutPrefix(
  url: string
): Promise<string> {
  try {
    const dataUrl = await getImageBase64(url)
    const base64WithoutPrefix = dataUrl.replace(/^data:image\/\w+;base64,/, "")
    return base64WithoutPrefix
  } catch (error) {
    throw new Error(
      "Failed to get image base64 without prefix: " + error.message
    )
  }
}

export function cmToInch(cm: number): number {
  return Math.round(cm / 2.54)
}

export function inchToCm(inches: number): number {
  return Math.round(inches * 2.54)
}

// 获取当前标签页的URL及title
// 定义一个接口来描述标签信息

// 改写getCurrentTabUrl函数，使其返回一个Promise<TabInfo>
export function getCurrentTabUrl(): Promise<TabInfo> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(tabs, 1111122222)
      if (tabs.length > 0) {
        const currentTab = tabs[0]
        if (currentTab.url && currentTab.title) {
          resolve({
            url: currentTab.url,
            title: currentTab.title
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
