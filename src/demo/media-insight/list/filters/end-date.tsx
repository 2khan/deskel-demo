import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

// UI COMPONENTS
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

// UTILS
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'

// TYPES
import { type Table } from '@tanstack/react-table'
import { type DateRange } from 'react-day-picker'
import { format } from 'date-fns'

type RegisteredDTFilterProps<TData> = {
  table: Table<TData>
}

export default function EndDateFilter<TData>({
  table
}: RegisteredDTFilterProps<TData>) {
  const { t } = useTranslation('demo')
  const [open, setOpen] = useState<boolean>(false)
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  const handleDate = useCallback(
    (value: DateRange | undefined) => {
      table.setColumnFilters((filters) => {
        const rest = filters.filter((filter) => filter.id !== 'end_date')
        if (!value) {
          return rest
        }

        return [
          ...rest,
          {
            id: 'end_date',
            value: value
          }
        ]
      })
    },
    [table]
  )

  const handleOpen = (value: boolean) => {
    setOpen(value)

    if (!value) {
      handleDate(date)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="filter-end-date">
        {t('media-insight.columns.end-date')}
      </Label>
      <Popover open={open} onOpenChange={handleOpen}>
        <PopoverTrigger asChild>
          <Button
            id="filter-end-date"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date?.to ? (
                <span>
                  {`${format(date.from, 'yyyy/MM/dd')} - ${format(date.to, 'yyyy/MM/dd')}`}
                </span>
              ) : (
                <span>{`${format(date.from, 'yyyy/MM/dd')}`}</span>
              )
            ) : (
              <span>{t('media-insight.filters.select-date-range')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
