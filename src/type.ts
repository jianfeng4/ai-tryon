// 定义枚举
export enum TAB {
  TRY_ON = 1,
  SIZE = 2
}

export interface BearStore {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
  updateBears: (newBears: number) => void
}

export interface TabStore {
  activeTab: TAB
  setActiveTab: (tab: number) => void
}

export interface ImgStore {
  uploadedFile: null
  base64Result: null
  setUploadedFile: (file: any) => void
  setBase64Result: (base64: any) => void
}
