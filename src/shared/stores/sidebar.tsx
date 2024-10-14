import { create } from 'zustand'
// https://zustand.docs.pmnd.rs/integrations/persisting-store-data
import { persist } from 'zustand/middleware'

type SidebarStore = {
  isOpen: boolean
  toggle: () => void
}

export const useSidebar = create(
  persist<SidebarStore>(
    (set, get) => ({
      isOpen: true,
      toggle: () => set({ isOpen: !get().isOpen })
    }),
    {
      name: 'sidebar'
    }
  )
)
