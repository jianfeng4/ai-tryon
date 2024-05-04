import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}
new Storage({
  copiedKeyList: ["hailing"]
})
window.addEventListener("load", () => {
  console.log("content script loaded")

  document.body.style.background = "pink"
})
