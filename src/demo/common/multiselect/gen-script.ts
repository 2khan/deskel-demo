import fs from 'fs'
import { TLocale } from '@/shared/i18n'
import { mock } from '@/demo/utils'
import { sub } from 'date-fns'
import { now } from '../constants'

const types = ['media-insight', 'SNS'] as const

export type TAnalysisData = {
  id: string
  organization_name: string
  threads: {
    id: string
    start_date: string
    end_date: string
    type: 'media-insight' | 'SNS'
  }[]
}

export const generateRow = (locale?: TLocale): TAnalysisData => {
  const gen = mock[locale ?? 'en']

  return {
    id: gen.string.uuid(),
    organization_name: gen.company.name(),
    threads: Array.from({ length: gen.number.int({ min: 1, max: 5 }) }).map(
      () => {
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
          type: gen.helpers.arrayElement(types)
        }
      }
    )
  }
}

export const data = Array.from({ length: 20 }).map(() => generateRow())

export const path = 'output.json'

fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
  if (err) {
    console.error('Error generating mock: ', err)
  } else {
    console.log('Generated mock at:', path)
  }
})
