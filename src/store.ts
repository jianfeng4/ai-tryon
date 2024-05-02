import { create } from "zustand"

import { Storage } from "@plasmohq/storage"

import type { ImgStore, TabStore } from "~type"
import { TAB } from "~type"

/**
 * @description: 创建全局状态管理
 */
export const useTabStore = create<TabStore>((set) => ({
  activeTab: TAB.TRY_ON,
  setActiveTab: (tab) => set({ activeTab: tab })
}))

export const useImgStore = create<ImgStore>((set) => ({
  uploadedFile: null,
  base64Result: null,
  setUploadedFile: (file) => set({ uploadedFile: file }),
  setBase64Result: (base64) => set({ base64Result: base64 })
}))

/**
 * @description: 保存数据到chrome.storage.syn或者chrome.storage.local
 */
const storageSync = new Storage() //It defaults to "sync".
const storageLocal = new Storage({
  area: "local"
})
export const setSyncStorage = async (key: string, value: any) => {
  await storageSync.set(key, value)
}
export const setLocalStorage = async (key: string, value: any) => {
  await storageLocal.set(key, value)
}

const storage = new Storage({
  copiedKeyList: ["key"]
})
// The code above will copy the data to Web localStorage when used with content scripts or extension pages.
