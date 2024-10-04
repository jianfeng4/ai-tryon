import { create } from "zustand"

import type {
  BodyStore,
  DropImgStore,
  LightStore,
  RouteStore,
  TabStore,
  TryOnStore,
  UnitStore,
  UserInfo,
  UserInfoStore
} from "~type"
import { TAB } from "~type"

/**
 * @description: 创建全局状态管理
 */
export const useTabStore = create<TabStore>((set) => ({
  activeTab: TAB.TRY_ON,
  setActiveTab: (tab) => set({ activeTab: tab })
}))

export const useTryOnStore = create<TryOnStore>((set) => ({
  base64Result: "",
  setBase64Result: (base64) => set({ base64Result: base64 }),
  sence: "",
  setSence: (sence) => set({ sence }),
  setHeaderUrl: (url) => set({ headerUrl: url }),
  headerUrl: ""
}))

export const useUserInfoStore = create<UserInfoStore>((set) => ({
  userInfo: {},
  setUserInfo: (userInfo: UserInfo) => set({ userInfo })
}))

export const useBodyStore = create<BodyStore>((set) => ({
  body: {
    Bust: "",
    Waist: "",
    Hips: ""
  },
  setBody: (body) => set({ body })
}))

export const useUnitStore = create<UnitStore>((set) => ({
  unit: "in",
  setUnit: (unit) => set({ unit })
}))

export const useRouteStore = create<RouteStore>((set) => ({
  route: "login",
  setRoute: (route) => set({ route } as any)
}))

export const useLightStore = create<LightStore>((set) => ({
  light: "normal",
  setLight: (light) => set({ light })
}))

export const useDropImgSrcStore = create<DropImgStore>((set) => ({
  imgSrc: "",
  setImgSrc: (src) => set({ imgSrc: src })
}))
