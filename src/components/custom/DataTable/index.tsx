'use client'
import { Suspense } from 'react'

import {
  type RowData,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type Table as TRootTable,
  type Row as TRootRow,
  type TableOptions,
  type Column,
  type Row,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ExpandedState,
  VisibilityState,
  getFacetedRowModel,
  getFacetedMinMaxValues
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableCellEditable,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import {
  type TdHTMLAttributes,
  type Dispatch,
  type SetStateAction,
  Fragment,
  useState
} from 'react'
import { DataTablePagination } from './pagination'
import DataTableToolbar from './toolbar'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

type EditedState<TData> = Record<Row<TData>['id'], boolean>

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    filterComponent?: React.FunctionComponent<{
      table: TRootTable<TData>
    }>
    align?: TdHTMLAttributes<HTMLTableCellElement>['align']
    label?: string
    updateData?: (
      row: TData,
      columnId: Column<TData>['id'],
      value: TValue
    ) => void
    symbol?: React.ReactNode
  }

  interface TableMeta<TData extends RowData> {
    editedRows: EditedState<TData>
    setEditedRows: Dispatch<SetStateAction<EditedState<TData>>>
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  renderExpand?: React.FunctionComponent<{
    table: TRootTable<TData>
    row: TRootRow<TData>
  }>
  options?: Omit<TableOptions<TData>, 'data' | 'columns' | 'getCoreRowModel'>
  hiddenColumns?: (keyof TData)[]
  showFooter?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  renderExpand: ExpandComponent,
  hiddenColumns = [],
  options,
  showFooter
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    hiddenColumns.length > 0
      ? hiddenColumns.reduce(
          (prev, next) => ({
            ...prev,
            [next]: false
          }),
          {} as VisibilityState
        )
      : {}
  )
  const [editedRows, setEditedRows] = useState<EditedState<TData>>({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onExpandedChange: setExpanded,
    onColumnVisibilityChange: setColumnVisibility,
    ...options,
    state: {
      sorting,
      columnFilters,
      expanded,
      columnVisibility,
      ...options?.state
    },
    meta: {
      editedRows,
      setEditedRows
    },
    defaultColumn: {
      size: 0,
      minSize: 0
    }
  })

  return (
    <div
      className="relative flex w-full grow flex-col justify-between gap-6"
      style={{ minHeight: 768, maxHeight: 'max-content' }}
    >
      <DataTableToolbar table={table} />
      <ScrollArea className="h-full w-full grow">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    align={header.column.columnDef.meta?.align ?? 'left'}
                    style={{
                      width: header.column.getSize(),
                      minWidth: header.column.columnDef.minSize
                    }}
                  >
                    {header.column.columnDef.meta?.symbol ? (
                      <div
                        className={cn(
                          'flex w-full items-center justify-between gap-2'
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <div className="w-max">
                          {header.column.columnDef.meta?.symbol &&
                            header.column.columnDef.meta.symbol}
                        </div>
                      </div>
                    ) : header.isPlaceholder ? null : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    data-selected={row.getIsSelected() && 'selected'}
                    data-expanded={row.getIsExpanded() && 'expanded'}
                  >
                    {row.getVisibleCells().map((cell) =>
                      cell.column.columnDef.meta?.updateData &&
                      table.options.meta?.editedRows[cell.row.id] ? (
                        <TableCellEditable key={cell.id} cell={cell} />
                      ) : (
                        <TableCell
                          key={cell.id}
                          align={cell.column.columnDef.meta?.align ?? 'left'}
                          style={{
                            width: cell.column.getSize(),
                            minWidth: cell.column.columnDef.minSize
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow
                      data-expanded={row.getIsExpanded() && 'expanded'}
                      className="bg-muted/20"
                    >
                      <TableCell colSpan={table.getAllColumns().length}>
                        {ExpandComponent && (
                          <Suspense>
                            <ExpandComponent table={table} row={row} />
                          </Suspense>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div
                    className="mx-auto flex w-full items-center justify-center"
                    style={{ height: 240 }}
                  >
                    {isLoading ? t('status.loading') : t('status.empty')}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {showFooter && (
        <DataTablePagination isLoading={isLoading} table={table} />
      )}
    </div>
  )
}
