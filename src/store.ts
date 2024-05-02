import { create } from "zustand"

import type { TabStore } from "~type"
import { TAB } from "~type"

export const useTabStore = create<TabStore>((set) => ({
  activeTab: TAB.TRY_ON,
  setActiveTab: (tab) => set({ activeTab: tab })
}))
