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

// for login or token refresh
export const request = async <T>(
  domain: string,
  params: any
): Promise<T | false> => {
  try {
    const response = await fetch(domain, {
      method: "POST",
      headers: {
        // accept: "application/json",
        "Content-Type": "application/json"
        // Authorization: `Bearer ${token}`
      },
      // credentials: 'omit',  // 关键点，允许携带 Cookie
      body: JSON.stringify(params)
    })

    console.log(JSON.stringify(params))
    console.log(response)

    if (!response.ok) {
      console.error("Request failed:", response.statusText)
      alert("Invalid input or login expires, please check.")
      return false
    }

    const data = (await response.json()) as T
    return data
  } catch (error) {
    console.error("Response Error:", error)
    alert("Cannot connect to server, please try again later.")
    return false
  }
}

export const requestPost = async <T>(
  domain: string,
  body: any
): Promise<T | false> => {
  const access_token = localStorage.getItem("VD_access_token")

  if (access_token) {
    try {
      const response = await fetch(domain, {
        method: "POST",
        headers: {
          // accept: "application/json",
          // 自动处理 multipart/form-data
          // "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        },
        // credentials: 'omit',  // 关键点，允许携带 Cookie
        body: body
      })

      console.log(body)
      console.log(response)

      if (!response.ok) {
        console.error("Request failed:", response.statusText)
        alert("Invalid input, please check.")
        return false
      }

      const data = (await response.json()) as T
      return data
    } catch (error) {
      console.error("Response Error:", error)
      alert("Cannot connect to server, please try again later.")
      return false
    }
  } else {
    console.error("VD_access_token not found.")
    alert("Login terminated, please login again.")
    return false
  }
}

export const requestGet = async <T>(url: string): Promise<T | false> => {
  const access_token = localStorage.getItem("VD_access_token")

  if (access_token) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          // accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
          // credentials: 'omit',  // 关键点，允许携带 Cookie
        }
      })
      if (!response.ok) {
        console.error("Request failed:", response.statusText)
        alert("Invalid input, please check.")
        return false
      }
      const data = (await response.json()) as T
      return data
    } catch (error) {
      console.error("Response Error:", error)
      alert("Cannot connect to server, please try again later.")
      return false
    }
  } else {
    console.error("VD_access_token not found.")
    alert("Login terminated, please login again.")
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

export const login = async (params: { username: string; password: string }) => {
  // 现在用户登陆放弃了Cookie,只使用JWTokens,登出需要使用logout清除localstorage
  try {
    const data = await request(
      "https://aws-free.voguediffusion.ai/users/login/",
      params
    )

    if (data.status === "logged") {
      // 将 access 和 refresh 存储到 localStorage
      localStorage.setItem("VD_access_token", data.access)
      localStorage.setItem("VD_refresh_token", data.refresh)

      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Login request failed:", error)
    return false
  }
}

export const refreshToken = async () => {
  const refresh_token = localStorage.getItem("VD_refresh_token")

  if (refresh_token) {
    try {
      const data = await request(
        "https://aws-free.voguediffusion.ai/users/token/refresh/",
        {
          refresh: refresh_token
        }
      )
      localStorage.setItem("VD_access_token", data.access)
    } catch (error) {
      console.error("Response Error:", error)
      alert("Cannot connect to server, please try again later.")
      return false
    }
  } else {
    console.error("VD_refresh_token not found.")
    alert("Login terminated, please login again.")
    return false
  }
}

export const logout = async () => {
  // localStorage.removeItem("VD_access_token");
  // localStorage.removeItem("VD_refresh_token");
  localStorage.clear()
  return true
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
  try {
    const data = await requestGet(
      "https://aws-free.voguediffusion.ai/users/me/"
    )
    // localStorage.setItem("VD_user_id", data.id);
    // localStorage.setItem("VD_user_name", data.username);
    // localStorage.setItem("VD_first_name", data.first_name);
    // localStorage.setItem("VD_last_name", data.last_name);
    // localStorage.setItem("VD_user_email", data.email);
    // localStorage.setItem("VD_credit_flex", data.credit_flex);
    // localStorage.setItem("VD_credit_subscribe", data.credit_subscribe);
    // localStorage.setItem("VD_avatar_url", data.avatar_url);
    // localStorage.setItem("VD_measurement_bust", data.bust);
    // localStorage.setItem("VD_measurement_hip", data.hip);
    // localStorage.setItem("VD_measurement_waist", data.waist);
    return data
  } catch (error) {
    console.error("Response Error:", error)
    alert("Cannot connect to server, please try again later.")
    return false
  }
}

export const getImage = async (imgurl: string) => {
  try {
    const img = await requestGet(
      "https://aws-free.voguediffusion.ai/users/image/" + imgurl
    )
    return img
  } catch (error) {
    console.error("Image browsering failed:", error)
    return false
  }
}

export const uploadImage = async (imgurl: string) => {
  try {
    // // 示例：从网络地址获取图片 Blob
    // const imageResponse = await fetch(imageUrl);
    // if (!imageResponse.ok) {
    //   throw new Error(`Failed to fetch image from URL: ${imageResponse.statusText}`);
    // }
    // const imageBlob = await imageResponse.blob(); // 获取 Blob 数据
    const formData = new FormData()
    formData.append("image", imgurl) // imgurl 是文件路径或 Blob 对象,

    const data = await requestPost(
      "https://aws-free.voguediffusion.ai/users/hashed_image_upload/",
      formData
    )

    // 根据响应中的 status 字段处理
    if (data.status === "success") {
      return data.url // 返回上传成功的图片 URL,可用于getImage的输入imgurl
    } else if (data.status === "error") {
      console.error(data.message) // 打印错误消息
      alert(data.message)
      return false
    }
  } catch (error) {
    console.error("Image upload failed:", error)
    alert("Image upload failed.")
    return false
  }
}

// {
//   "0": {
//     "url": "fM9G6DDiW9n01ajb",
//     "time": "2024-09-05T18:34:42Z"
//   },
//   "1": {
//     "url": "lfdqN0IxfRy5deXo",
//     "time": "2024-09-05T18:32:59Z"
//   },
//   "2": {
//     "url": "7iGbspNMvGyMOu6n",
//     "time": "2024-09-05T18:32:42Z"
//   },
//   "3": {
//     "url": "khCoClypzLNR1X84",
//     "time": "2024-09-05T18:31:08Z"
//   },
//   "status": "success",
//   "num": 4
// }
// 可以使用username: AAA, password: aaa 测试，包含9次tryonhistory
export const lastfewTryOnHistory = async (index: string) => {
  // 从index开始调取4个tryonhistory的url，用于getImage，以string形式
  const imgs = await requestGet(
    "https://aws-free.voguediffusion.ai/users/tryon_history_lastfew/" + index
  )
  return imgs
}

// tryon的api和之前的类似，地址为"https://aws-free.voguediffusion.ai/user/receive_data/"
// 暂时因为资源问题未开放
