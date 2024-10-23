import fs from 'fs'
import { TLocale } from '@/shared/i18n'
import { mock } from '@/demo/utils'
import { sub } from 'date-fns'
import { now } from '../constants'

const types = ['media-insight', 'sns'] as const

export type TAnalysisData = {
  id: string
  start_date: string
  end_date: string
  organization_name: string
  type: (typeof types)[number]
}

export const generateRow = (locale?: TLocale): TAnalysisData => {
  const gen = mock[locale ?? 'en']

  const endDate = gen.date.between({
    from: sub(now, {
      months: 1
    }),
    to: now
  })
  return {
    id: gen.string.uuid(),
    start_date: sub(endDate, { months: 3 }).toISOString(),
    end_date: endDate.toISOString(),
    organization_name: gen.company.name(),
    type: gen.helpers.arrayElement(types)
  }
}

export const data = Array.from({ length: 50 }).map(() => generateRow())

export const path = 'output.json'

fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
  if (err) {
    console.error('Error generating mock: ', err)
  } else {
    console.log('Generated mock at:', path)
  }
})
