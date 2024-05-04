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
