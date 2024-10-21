import fs from 'fs'
import { TLocale } from '@/shared/i18n'
import { mock } from '@/demo/utils'
import { type TRow } from './view'
import { allStatus } from './common'

export const generateRow = (locale?: TLocale): TRow => {
  const gen = mock[locale ?? 'en']
  const status = gen.helpers.arrayElement(allStatus)
  return {
    id: gen.string.uuid(),
    organization_name: gen.company.name(),
    homepages: Array.from({ length: gen.number.int({ min: 1, max: 3 }) }).map(
      () => gen.internet.domainName()
    ),
    start_date: gen.date.past({ years: 0.5 }).toISOString(),
    end_date: gen.date.recent().toISOString(),
    ...(status === 'in_progress'
      ? {
          status,
          progress: gen.number.int({ min: 0, max: 100 })
        }
      : {
          status
        })
  }
}

export const data = Array.from({ length: 100 }).map(() => generateRow())

export const path = 'output.json'

fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
  if (err) {
    console.error('Error generating mock: ', err)
  } else {
    console.log('Generated mock at:', path)
  }
})
