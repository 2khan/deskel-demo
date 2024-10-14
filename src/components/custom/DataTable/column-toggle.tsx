'use client'

import { CheckIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { type Column, type Table } from '@tanstack/react-table'
import TooltipButton from '@/components/custom/TooltipButton'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { CommandList } from 'cmdk'
import { useTranslation } from 'react-i18next'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function ColumnToggle<TData>({
  table
}: DataTableViewOptionsProps<TData>) {
  const { t } = useTranslation()
  const handleSelect = (column: Column<TData>) => () => {
    column.toggleVisibility(!column.getIsVisible())
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TooltipButton
          size="icon"
          variant="outline"
          helper={t('action.show-column')}
        >
          <MixerHorizontalIcon />
        </TooltipButton>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <Command>
          <CommandInput placeholder={t('action.search')} />
          <CommandList>
            <CommandEmpty>{t('status.empty')}</CommandEmpty>
            <CommandGroup heading={t('token.column')}>
              <div className="flex w-full gap-2">
                <ScrollArea className="grow" style={{ height: 320 }}>
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        typeof column.accessorFn !== 'undefined' &&
                        column.getCanHide()
                    )
                    .map((column) => (
                      <CommandItem
                        key={column.id}
                        className="justify-between capitalize"
                        onSelect={handleSelect(column)}
                      >
                        <div className="flex items-center">
                          <CheckIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              column.getIsVisible()
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {column.columnDef.meta?.label}
                        </div>
                        <div className="w-max text-muted-foreground">
                          {column.columnDef.meta?.symbol}
                        </div>
                      </CommandItem>
                    ))}
                </ScrollArea>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
