const urls = {
  tryOn: "https://tryon-advanced.tianlong.co.uk/upload/images",
  getSizeGuide: "https://api.tianlong.co.uk/get-size-guide",
  getSizeRecommendation: "https://api.tianlong.co.uk/get-size-recommendation"
}
type EnhanceTryOnData = {
  age: string
  bodyShape: string
  ethnic: string
  sex: "female" | "male"
  skinColor: string
}

type GetTryOnParams = {
  face: string
  model: string
  prompt: string
  enhanceTryOnData?: EnhanceTryOnData
}

type GetSizeRecommendationParams = {
  category_id: string
  product_url: string
  page_title: string
  img_src_url: string
}
// 获取token
const token = "eyJhbG"
export const request = async <T>(
  domain: string,
  params: any
): Promise<T | false> => {
  try {
    const response = await fetch(domain, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      console.error("Request failed:", response.statusText)
      return false
    }

    const data = (await response.json()) as T
    return data
  } catch (error) {
    console.error("Error:", error)
    return false
  }
}

export const getTryOn = async (
  params: GetTryOnParams
): Promise<{ image: string; status: string }> => {
  const response = await request<{ image: string; status: string }>(
    urls.tryOn,
    params
  )
  if (response === false) {
    throw new Error("Request failed")
  }
  return response
}

export const getSizeGuide = async (params: GetSizeRecommendationParams) => {
  return request(urls.getSizeGuide, params)
}
export const getSizeRecommendation = async () => {
  return request(urls.getSizeRecommendation, {})
}
