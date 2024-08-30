const urls = {
  tryOn: "https://sdrelay.faishion.ai/advanced-test",
  getSizeGuide: "https://yltest.faishion.ai/get-size-guide",
  getSizeRecommendation: "https://yltest.faishion.ai/get-size-recommendation",
  geteals: "https://deals.faishion.ai/deals-by-domain"
}
type EnhanceTryOnData = {
  Age: string
  BodyShape: string
  Ethnicity: string
  Gender: "female" | "male"
  HairStyle: string
}

type GetTryOnParams = {
  face: string
  model: string
  prompt: string
  enhanceTryOnData?: EnhanceTryOnData
}

type GetGuideParams = {
  category_id: string
  product_url: string
  page_title: string
  img_src_url: string
  bodyDimensionsIn: {
    Waist: string
    Hips: string
    Busts: string
  }
}

type GetSizeRecommendationParams = {
  base64_image: string
  body_measurements: {
    Bust: string
    Waist: string
    Hips: string
  }
  showing_chart: boolean
  tabUrl: string
}
// 获取token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzMjg0OTUxLCJpYXQiOjE3MjMyODM0NTQsImp0aSI6IjNiYzRhMTgwY2EwNDQ2MDNiZmY1YTM2MDlkZjVlNmI0IiwidXNlcl9pZCI6Mn0.2euLg4UxasPr3RiXerX9OkIX7jnXXsz-HOVu1d9q07k"
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

export const requestGet = async <T>(url: string): Promise<T | false> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
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

export const getSizeGuide = async (params: GetGuideParams) => {
  return request(urls.getSizeGuide, params)
}
export const getSizeRecommendation = async (
  params: GetSizeRecommendationParams
) => {
  return request(urls.getSizeRecommendation, params)
}
export const getDeals = async (params: { domain: string }) => {
  return request(urls.geteals, params)
}

// 登录
export const login = async (params: { username: string; password: string }) => {
  return request("http://54.151.67.121:8867/users/login/", params)
}

// 获取用户详细信息
// interface User {
//   avatar_url: string | null
//   bust: string
//   credit_flex: number
//   credit_subscribe: number
//   email: string
//   first_name: string
//   hip: string
//   id: number
//   last_name: string
//   password: string
//   subscribe_plan: object // 这里假设为一个空对象，具体结构需要根据实际数据定义
//   tryon_history: any[] // 这里假设为一个空数组，具体类型需要根据实际数据定义
//   username: string
//   waist: string
// }
export const getUserInfo = async () => {
  return requestGet("http://54.151.67.121:8867/users/me/")
}

export const refreshToken = async () => {
  return request("http://54.151.67.121:8867/users/token/refresh/", {
    refresh:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMzM2OTg1NCwiaWF0IjoxNzIzMjgzNDU0LCJqdGkiOiJlZTRlN2JmNzlkZjc0YTE1OWY5MTVhMmM5NjUyNTRlNiIsInVzZXJfaWQiOjJ9.S0WkEkZ2HcpH5zwCQsbdXi4jvNv6KC2eSaaqqhgv0aU"
  })
}
