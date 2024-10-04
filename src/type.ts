// 定义枚举
export enum TAB {
  TRY_ON = 1,
  SIZE = 2
}

export interface BearStore {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
  updateBears: (newBears: number) => void
}

export interface TabStore {
  activeTab: TAB
  setActiveTab: (tab: number) => void
}

export interface TryOnStore {
  base64Result: string
  setBase64Result: (base64: any) => void
  sence: string
  setSence: (sence: string) => void
  setHeaderUrl: (url: string) => void
  headerUrl: string
}

type Body = {
  Bust: string
  Waist: string
  Hips: string
}
export interface BodyStore {
  body: Body
  setBody: (body: Body) => void
}

export interface UnitStore {
  unit: "in" | "cm"
  setUnit: (unit: "in" | "cm") => void
}

export interface TabInfo {
  url: string
  title: string
}

export interface RouteStore {
  route: "login" | "home" | "result"
  setRoute: (route: string) => void
}

export interface UserInfo {
  id?: number
  username?: string
  email?: string
  first_name?: string
  last_name?: string
  password?: string
  bust?: string // 假设尺寸是字符串类型，如果是数字类型，则应该使用 number
  waist?: string
  hip?: string
  avatar_url?: string | null
  tryon_history?: []
  credit_flex?: number
  credit_subscribe?: number
  subscribe_plan?: Object
}
export interface UserInfoStore {
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void
}
