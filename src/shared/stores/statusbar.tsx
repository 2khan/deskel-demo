import { create } from 'zustand'

type StatusbarStore = {
  title: string
  setTitle: (title: string) => void
}

export const useStatusbar = create<StatusbarStore>((set) => ({
  title: '',
  setTitle: (title) =>
    set({
      title
    })
}))
