import fs from 'fs'
import { TLocale } from '@/shared/i18n'
import { mock } from '@/demo/utils'
import { sub } from 'date-fns'

type TRow = {
  id: string
  updated_date: string
  label: string
}

export const generateRow = (locale?: TLocale): TRow => {
  const gen = mock[locale ?? 'en']
  const now = new Date()
  return {
    id: gen.string.uuid(),
    updated_date: gen.date
      .between({
        from: sub(now, {
          months: 1
        }),
        to: now
      })
      .toISOString(),
    label: gen.company.name()
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
