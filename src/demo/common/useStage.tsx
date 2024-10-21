import { create } from 'zustand'
import { stages } from './stages'

type StageStore = {
  index: number
  next: () => void
  goto: (index: number) => void
}

export const useStage = create<StageStore>((set, get) => ({
  index: 0,
  next: () => {
    const cur = get().index
    if (cur > stages.length - 1) return

    set({
      index: cur + 1
    })
  },
  goto: (index) => {
    set({ index })
  }
}))
