import fs from 'fs'
import { TLocale } from '@/shared/i18n'
import { mock } from '@/demo/utils'
import { sub } from 'date-fns'
import { now } from '../constants'

export type TThreadData = {
  id: string
  updated_date: string
  label: string
  threads: {
    id: string
    created_date: string
    title: string
  }[]
}

export const generateRow = (locale?: TLocale): TThreadData => {
  const gen = mock[locale ?? 'en']
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
    label: gen.company.name(),
    threads: Array.from({ length: gen.number.int({ min: 5, max: 20 }) }).map(
      () => ({
        id: gen.string.uuid(),
        title: gen.company.catchPhrase(),
        created_date: gen.date
          .between({
            from: sub(now, {
              months: 1
            }),
            to: now
          })
          .toISOString()
      })
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
