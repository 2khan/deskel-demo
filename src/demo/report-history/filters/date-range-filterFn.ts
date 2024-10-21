import { Row } from '@tanstack/react-table'
import { isAfter, isBefore } from 'date-fns'
import type { DateRange } from 'react-day-picker'

export function dateRangeFilterFn<TRow>(
  row: Row<TRow>,
  columnId: string,
  filterValue: unknown
) {
  const { from, to } = filterValue as DateRange
  const date = row.getValue<string>(columnId)

  if (from && to) {
    return isAfter(date, from) && isBefore(date, to)
  }

  if (from) {
    return isAfter(date, from)
  }

  if (to) {
    return isBefore(date, to)
  }

  return true
}
