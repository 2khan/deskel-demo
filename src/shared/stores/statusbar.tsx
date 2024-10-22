import { create } from 'zustand'

type StatusbarStore = {
  title?: string
  description?: string
  setTitle: (params: { title?: string; description?: string }) => void
}

export const useStatusbar = create<StatusbarStore>((set) => ({
  title: '',
  setTitle: ({ title, description }) =>
    set({
      title,
      description
    })
}))
