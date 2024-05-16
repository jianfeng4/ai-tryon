import Compressor from "compressorjs"

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

export function captureScreen() {
  return new Promise((resolve, reject) => {
    // 使用chrome的API来获取当前标签页的截图
    chrome.tabs.captureVisibleTab(
      null,
      { format: "jpeg", quality: 20 },
      function (dataUrl) {
        if (chrome.runtime.lastError) {
          // 如果出现错误，reject Promise
          reject(chrome.runtime.lastError.message)
        } else {
          // 如果成功，resolve Promise并传递截图数据
          resolve(dataUrl)
        }
      }
    )
  })
}

/**
 * 
 * @param originFile 
 * @param options 
    const compressionOptions: Compressor.Options = {
    quality: 0.6, // 压缩质量，可选，默认为0.6
    maxWidth: 800, // 图片最大宽度，可选，默认为800
    maxHeight: 600, // 图片最大高度，可选，默认为600
    mimeType: 'image/jpeg' // 输出图片类型，可选，默认为'image/jpeg'
  };
 * @returns 
 */
export const compressImage = async (
  originFile: File,
  options: Compressor.Options = {}
): Promise<File> => {
  return new Promise((resolve, reject) => {
    new Compressor(originFile, {
      ...options,
      success: (blob) => {
        const file = new File([blob], originFile.name, {
          type: originFile.type
        })
        resolve(file)
      },
      error: reject
    })
  })
}

export const getBase64ByFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
  })
}
/**
 * 用于展示上传完成后的缩略图
 * @param file
 * @param maxSize
 * @returns
 */
export async function processAndGenerateThumbnail(file: File, maxSize: number) {
  if (file.size / 1024 / 1024 > maxSize) {
    return null
  }

  const thumbnailFile = await compressImage(file, {
    quality: 0.6,
    maxHeight: 250
  })
  const thumbnailDataUrl = await getBase64ByFile(thumbnailFile)
  return thumbnailDataUrl
}

export const getDomain = (ur: string = "") => {
  const url = new URL(ur)
  return url.origin
}
