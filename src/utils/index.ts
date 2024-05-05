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
