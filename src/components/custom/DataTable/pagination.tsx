import {
  CheckCircledIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import Spinner from '../Loaders/Spinner'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  isLoading?: boolean
}

export function DataTablePagination<TData>({
  table,
  isLoading
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation()
  const handleSetPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^\d]/g, '')
    const pageIndex = sanitizedValue ? Number(sanitizedValue) - 1 : 0
    table.setPageIndex(pageIndex)
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">{t('token.count')}</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="h-8" style={{ width: 64 }}>
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top" align="end">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-max items-center justify-center gap-1 text-sm font-medium">
        {t('token.page')}: {table.getState().pagination.pageIndex + 1}
        {table.getPageCount() !== -1 && <span> / {table.getPageCount()}</span>}
      </div>
      <Input
        className="w-full p-2 text-center"
        style={{ maxWidth: 72 }}
        onChange={handleSetPage}
        placeholder="#"
      />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        {table.getPageCount() !== -1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        )}

        <div
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full bg-accent',
            !isLoading && 'text-accent-foreground'
          )}
        >
          {isLoading ? (
            <Spinner className="h-5 w-5" />
          ) : (
            <CheckCircledIcon className="h-5 w-5" />
          )}
        </div>
      </div>
    </div>
  )
}
