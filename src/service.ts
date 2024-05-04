const urls = {
  tryOn: "https://tryon-advanced.tianlong.co.uk/upload/images",
  sizeRecommedation: "https://api.tianlong.co.uk/get-size-guide"
}
type getTryOnParams = {
  face: string
  model: string
  prompt: string
  enhanceTryOnData: {
    age: string
    bodyShape: string
    ethnic: string
    sex: "female" | "male"
    skinColor: string
  }
}
// 获取token
const token = "eyJhbG"
export const request = async (domain, params) => {
  return new Promise((resolve, reject) => {
    fetch(domain, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(params)
    })
      .then((res) => res.json())
      .then((data: any) => {
        console.log(data, "hhhhhh")
        resolve(data)
      })
      .catch((error) => {
        console.error("Error:", error)
        resolve(false)
      })
  }).catch((error) => {
    console.error("Error occurred while retrieving current tab:", error)
  })
}

export const getTryOn = async (
  params: getTryOnParams
): Promise<{ image: string; status: string }> => {
  return request(urls.tryOn, params) as Promise<{
    image: string
    status: string
  }>
}
export const getSizeRecommedation = async (params) => {
  return request(urls.sizeRecommedation, params)
}
