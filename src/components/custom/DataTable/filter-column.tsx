import { dx } from '@/shared/design-system/typography'
import { type Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export default function FilterColumn<TData>({
  table
}: DataTableViewOptionsProps<TData>) {
  const { t } = useTranslation()
  const filterComponents = useMemo(() => {
    return table
      .getAllColumns()
      .filter(
        (column) =>
          column.getCanFilter() && column.columnDef.meta?.filterComponent
      )
      .map((column) => {
        const FilterComponent = column.columnDef.meta?.filterComponent
        return (
          FilterComponent && (
            <div key={column.id} className="w-full" style={{ maxWidth: 320 }}>
              {<FilterComponent table={table} />}
            </div>
          )
        )
      })
  }, [table])
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border bg-muted p-2">
      <span className={dx('heading-compact-01')}>{t('token.filter')}</span>
      <div className="flex gap-2">{filterComponents}</div>
    </div>
  )
}
