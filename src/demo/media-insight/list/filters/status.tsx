import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

// UI COMPONENTS
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// TYPES
import { type Table } from '@tanstack/react-table'
import { TRow } from '../view'
import { ParseKeys } from 'i18next'
import { allStatus } from '../../common'

type TAlertFilterProps<TData> = {
  table: Table<TData>
}

const labelMap = {
  draft: 'media-insight.status.draft',
  in_progress: 'media-insight.status.in-progress',
  completed: 'media-insight.status.completed',
  cancelled: 'media-insight.status.cancelled',
  error: 'media-insight.status.error'
} satisfies Record<TRow['status'], ParseKeys<'demo'>>

export default function StatusFilter<TData>({
  table
}: TAlertFilterProps<TData>) {
  const { t } = useTranslation('demo')
  const [value, setValue] = useState('all')

  const handleAlertChange = useCallback(
    (value: string) => {
      table.setColumnFilters((filters) => {
        setValue(value)
        const rest = filters.filter((filter) => filter.id !== 'status')
        if (!value || value === 'all') {
          return rest
        }

        return [
          ...rest,
          {
            id: 'status',
            value: value
          }
        ]
      })
    },
    [table]
  )

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="alert">{t('media-insight.columns.status')}</Label>
      <Select value={value} onValueChange={handleAlertChange}>
        <SelectTrigger id="alert" className="bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('media-insight.columns.status')}</SelectLabel>
            <SelectSeparator />
            <SelectItem value="all">
              {t('media-insight.filters.all')}
            </SelectItem>
            {allStatus.map((status) => (
              <SelectItem key={status} value={status}>
                {t(labelMap[status])}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
