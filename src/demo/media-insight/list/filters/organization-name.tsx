// TYPES
import { useTranslation } from 'react-i18next'

import { Label } from '@/components/ui/label'
import DebouncedInput from '@/components/custom/DebounceInput'

import { type Table } from '@tanstack/react-table'
import { useCallback } from 'react'

type TFilterProps<TData> = {
  table: Table<TData>
}

export default function Search<TData>({ table }: TFilterProps<TData>) {
  const { t } = useTranslation('demo')

  const handleChange = useCallback(
    (value: string | number) => {
      table.setColumnFilters((filters) => {
        const rest = filters.filter(
          (filter) => filter.id !== 'organization_name'
        )
        if (!value) return rest

        return [
          ...rest,
          {
            id: 'organization_name',
            value: value
          }
        ]
      })
    },
    [table]
  )

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="filter-organization-name">
        {t('media-insight.columns.organization-name')}
      </Label>
      <DebouncedInput
        id="filter-organization-name"
        placeholder={t('media-insight.filters.search')}
        className="bg-background"
        value={
          (table
            .getState()
            .columnFilters.find((filter) => filter.id === 'organization_name')
            ?.value as string) ?? ''
        }
        onChange={handleChange}
      />
    </div>
  )
}
