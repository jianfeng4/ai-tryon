const urls = {
  tryOn: "https://api.tianlong.co.uk/try-on",
  sizeRecommedation: "https://api.tianlong.co.uk/get-size-guide"
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

export const getTryOn = async (params) => {
  return request(urls.tryOn, params)
}
export const getSizeRecommedation = async (params) => {
  return request(urls.sizeRecommedation, params)
}
