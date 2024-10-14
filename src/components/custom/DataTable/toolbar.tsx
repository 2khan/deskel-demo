import { type Table } from '@tanstack/react-table'
import { ColumnToggle } from './column-toggle'
import FilterColumn from './filter-column'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export default function DataTableToolbar<TData>(
  props: DataTableToolbarProps<TData>
) {
  const { table } = props

  return (
    <div className="flex items-end justify-between gap-2">
      <FilterColumn table={table} />
      {table.getSelectedRowModel().rows.length > 0 && (
        <span className="font-mono text-sm text-muted-foreground">
          {table.getSelectedRowModel().rows.length} selected
        </span>
      )}
      <ColumnToggle table={table} />
    </div>
  )
}
