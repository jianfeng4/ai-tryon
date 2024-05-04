import { create } from "zustand"

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
