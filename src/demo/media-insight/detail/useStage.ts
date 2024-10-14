import { create } from 'zustand'
import { TAugStage, StageDataMap } from './data'

type StageStore = {
  stage: TAugStage
  next: () => void
}

export const useStage = create<StageStore>((set, get) => ({
  stage: 'create-draft-organization-name',
  next: () =>
    set({
      stage: StageDataMap[get().stage].nextStage
    })
}))
