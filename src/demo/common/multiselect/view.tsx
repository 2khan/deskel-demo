import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import {
  CalendarIcon,
  CaretSortIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

import data from './output.json'
import { useState } from 'react'
import { TAnalysisData } from './gen-script'
import { format } from 'date-fns'
import { dx } from '@/shared/design-system/typography'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

export default function Multiselect() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<TAnalysisData[]>([])
  const [types, setTypes] = useState<TAnalysisData['type'][]>([
    'media-insight',
    'sns'
  ])

  const handleSelect = (item: TAnalysisData) => () => {
    setSelected((prev) => [...prev, item])
  }

  const handleRemove = (item: TAnalysisData) => () => {
    setSelected((prev) => prev.filter((d) => d.id !== item.id))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full flex-col gap-2">
          <Button
            role="combobox"
            variant="outline"
            className="h-max w-full justify-between"
          >
            {t('action.select')}
            <CaretSortIcon className="shrink-0" />
          </Button>
          {selected && selected.length > 0 && (
            <div className="flex flex-col gap-2 rounded-lg bg-muted p-2">
              <span className={dx('label-01', 'text-muted-foreground')}>
                {t('token.selected-analyses')}
              </span>

              <div className="flex grow flex-col gap-2">
                {selected.map((item) => (
                  <span
                    className={dx('label-01', 'line-clamp-1')}
                    key={item.id}
                  >
                    {item.organization_name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-screen-lg p-0">
        <DialogTitle className="sr-only">
          {t('glossary.multi-step')}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {t('action.select')}
        </DialogDescription>
        <Command>
          <CommandInput placeholder={t('action.search')} className="h-12" />
          <CommandList
            className="overflow-y-hidden"
            style={{ maxHeight: 'max-content' }}
          >
            <div className="flex items-center justify-between p-2">
              <div className="flex flex-col gap-1">
                <span className={dx('label-01', 'text-muted-foreground')}>
                  {t('token.filter')}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className={cn(
                      '',
                      types.includes('media-insight') &&
                        'border-primary text-primary'
                    )}
                    onClick={() =>
                      setTypes((prev) =>
                        prev.includes('media-insight')
                          ? prev.filter((type) => type !== 'media-insight')
                          : [...prev, 'media-insight']
                      )
                    }
                  >
                    {t('glossary.media-insight')}
                  </Button>
                  <Button
                    variant="outline"
                    className={cn(
                      '',
                      types.includes('sns') && 'border-primary text-primary'
                    )}
                    onClick={() =>
                      setTypes((prev) =>
                        prev.includes('sns')
                          ? prev.filter((type) => type !== 'sns')
                          : [...prev, 'sns']
                      )
                    }
                  >
                    {t('glossary.SNS')}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="filter-start-date"
                    className={dx('label-01', 'text-muted-foreground')}
                  >
                    {t('token.start-date')}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="filter-start-date"
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{t('action.select-date-range')}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar initialFocus mode="range" numberOfMonths={2} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="filter-start-date"
                    className={dx('label-01', 'text-muted-foreground')}
                  >
                    {t('token.end-date')}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="filter-start-date"
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{t('action.select-date-range')}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar initialFocus mode="range" numberOfMonths={2} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="flex w-full gap-2 p-2">
              <div className="flex w-full grow flex-col gap-2">
                <span className={dx('label-01', 'text-muted-foreground')}>
                  {t('glossary.analyses')}
                </span>
                <CommandEmpty className="p-2 text-muted-foreground">
                  <span className={dx('body-compact-01')}>
                    {t('status.empty')}
                  </span>
                </CommandEmpty>
                <CommandGroup className="w-full">
                  <ScrollArea
                    className="h-full w-full grow pr-4"
                    style={{ height: 480 }}
                  >
                    {data
                      .filter(
                        (d) =>
                          !selected.includes(d as TAnalysisData) &&
                          types.includes(d.type as TAnalysisData['type'])
                      )
                      .map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={handleSelect(item as TAnalysisData)}
                          className="mb-2 flex flex-col gap-2 rounded-md border p-2"
                        >
                          <div className="flex w-full items-center justify-between">
                            <span className={dx('body-compact-01')}>
                              {item.organization_name}
                            </span>
                            <span
                              className={dx(
                                'label-01',
                                'text-muted-foreground'
                              )}
                            >{`${format(item.start_date, 'yyyy/MM/dd HH:mm')} - ${format(item.end_date, 'yyyy/MM/dd HH:mm')}`}</span>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <span
                              className={dx(
                                'label-01',
                                'text-muted-foreground'
                              )}
                            >
                              {item.type === 'sns' && t('glossary.SNS')}
                              {item.type === 'media-insight' &&
                                t('glossary.media-insight')}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                  </ScrollArea>
                </CommandGroup>
              </div>
              <Separator orientation="vertical" />
              <ScrollArea
                className="h-full w-full grow pr-4"
                style={{ height: 480 }}
              >
                <div className="flex flex-col gap-2">
                  <span className={dx('label-01', 'text-muted-foreground')}>
                    {t('token.selected-analyses')}
                  </span>
                  {selected.map((item) => (
                    <button
                      key={item.id}
                      onClick={handleRemove(item as TAnalysisData)}
                      className="mb-2 flex flex-col gap-2 rounded-md border p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className={dx('body-compact-01', 'text-primary')}>
                          {item.organization_name}
                        </span>
                        <span
                          className={dx('label-01', 'text-muted-foreground')}
                        >{`${format(item.start_date, 'yyyy/MM/dd HH:mm')} - ${format(item.end_date, 'yyyy/MM/dd HH:mm')}`}</span>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <span
                          className={dx('label-01', 'text-muted-foreground')}
                        >
                          {item.type === 'sns' && t('glossary.SNS')}
                          {item.type === 'media-insight' &&
                            t('glossary.media-insight')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex items-center justify-end gap-2 p-2">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">{t('token.count')}</p>
                <Select value="10">
                  <SelectTrigger className="h-8" style={{ width: 64 }}>
                    <SelectValue placeholder="10" />
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
                {t('token.page')}: 1
              </div>
              <Input
                className="w-full p-2 text-center"
                style={{ maxWidth: 72 }}
                placeholder="#"
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled={true}>
                  <span className="sr-only">Go to first page</span>
                  <DoubleArrowLeftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" disabled={true}>
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Go to last page</span>
                  <DoubleArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
