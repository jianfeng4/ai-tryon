import { sendToBackground } from "@plasmohq/messaging"

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startScreenshot") {
    startScreenshot()
  }
})

export async function startScreenshot() {
  const overlay = document.createElement("div")
  overlay.style.position = "fixed"
  overlay.style.top = "0"
  overlay.style.left = "0"
  overlay.style.width = "100%"
  overlay.style.height = "100%"
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
  overlay.style.zIndex = "9999"
  overlay.style.cursor = "crosshair"
  document.body.appendChild(overlay)

  let startX,
    startY,
    isSelecting = false
  const selectionBox = document.createElement("div")
  selectionBox.style.position = "absolute"
  // FIX ME:边框样式没生效
  selectionBox.style.border = "10px dashed #2354E6;"
  overlay.appendChild(selectionBox)

  overlay.addEventListener("mousedown", (e) => {
    startX = e.clientX
    startY = e.clientY
    selectionBox.style.left = `${startX}px`
    selectionBox.style.top = `${startY}px`
    selectionBox.style.width = "0px"
    selectionBox.style.height = "0px"
    selectionBox.style.border = "4px solid red" // 开始选择时改变边框样式
    isSelecting = true // Set isSelecting to true
    overlay.addEventListener("mousemove", onMouseMove)
  })

  overlay.addEventListener("mouseup", (e) => {
    const endX = e.clientX
    const endY = e.clientY
    isSelecting = false // Set isSelecting to false
    overlay.removeEventListener("mousemove", onMouseMove)
    overlay.remove()
    captureScreenshot(startX, startY, endX, endY)
  })

  function onMouseMove(e) {
    if (!isSelecting) return
    requestAnimationFrame(() => {
      const currentX = e.clientX
      const currentY = e.clientY
      const width = Math.abs(currentX - startX)
      const height = Math.abs(currentY - startY)
      const left = Math.min(currentX, startX)
      const top = Math.min(currentY, startY)
      const right = Math.max(currentX, startX)
      const bottom = Math.max(currentY, startY)

      selectionBox.style.width = `${width}px`
      selectionBox.style.height = `${height}px`
      selectionBox.style.left = `${left}px`
      selectionBox.style.top = `${top}px`

      // Update clip path to make the selection area clear
      overlay.style.clipPath = `polygon(
        0% 0%, 0% 100%, 
        ${left}px 100%, 
        ${left}px ${top}px, 
        ${right}px ${top}px, 
        ${right}px ${bottom}px, 
        ${left}px ${bottom}px, 
        ${left}px 100%, 
        100% 100%, 
        100% 0%
      )`
    })
  }

  async function captureScreenshot(x1, y1, x2, y2) {
    const area = {
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1)
    }
    const resp = await sendToBackground({
      name: "capture",
      body: {}
    })
    console.log("🚀 ~ startScreenshot ~ resp:", resp)
    const { screenShoot } = resp.body || {}
    const img = new Image()
    img.src = screenShoot
    img.onload = async () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = area.width
      canvas.height = area.height
      ctx.drawImage(
        img,
        area.x,
        area.y,
        area.width,
        area.height,
        0,
        0,
        area.width,
        area.height
      )
      console.log("🚀 ~ startScreenshot ~ canvas:", canvas)

      // 将截取的图像导出为数据URL
      const croppedDataUrl = canvas.toDataURL("image/jpeg")
      // 可以在这里处理截图结果，例如下载或预览
      console.log(croppedDataUrl, "croppedDataUrl")
      // 传给background进行换脸
      const resp = await sendToBackground({
        name: "ping",
        body: {
          captureBase64: croppedDataUrl
        }
      })
    }
  }
}
