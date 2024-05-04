import { Storage } from "@plasmohq/storage"

/**
 * @description: 保存数据到chrome.storage.syn或者chrome.storage.local
 */
const storageSync = new Storage() //It defaults to "sync".
const storageLocal = new Storage({
  area: "local"
})
export const setToSyncStorage = async (key: string, value: any) => {
  await storageSync.set(key, value)
}
export const setToLocalStorage = async (key: string, value: any) => {
  const res = await storageLocal.set(key, value)
  console.log(res, 66666)
  return res
}

export const getFromLocalStorage = async (key: string) => {
  const res = await storageLocal.get(key)
  console.log(res, 77777)
  return res
}

export const getFromSyncStorage = async (key: string) => {
  const res = await storageSync.get(key)
  return res
}
