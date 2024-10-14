export const allStatus = [
  'draft',
  'error',
  'completed',
  'cancelled',
  'in_progress'
] as const

export type TStatus = (typeof allStatus)[number]
