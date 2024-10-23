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
import { CaretSortIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

import data from './output.json'
import { useState } from 'react'
import { TAnalysisData } from './gen-script'
import { format } from 'date-fns'
import { dx } from '@/shared/design-system/typography'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

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

          <div className="flex flex-col gap-2 rounded-lg bg-muted p-2">
            <span className={dx('label-01', 'text-muted-foreground')}>
              Selected
            </span>
            {selected && selected.length > 0 && (
              <div className="grid grow grid-cols-12 gap-2">
                {selected.map((item) => (
                  <span
                    className={dx(
                      'label-01',
                      'col-span-6 line-clamp-1 text-start'
                    )}
                    key={item.id}
                  >
                    {item.organization_name}
                  </span>
                ))}
              </div>
            )}
          </div>
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
            className="overflow-y-hidden bg-background"
            style={{ maxHeight: 'max-content' }}
          >
            <div className="flex flex-col gap-2 p-2">
              <span className={dx('label-01', 'text-muted-foreground')}>
                {t('token.filter')}
              </span>
              <div className="flex items-center justify-between">
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
                          className="mb-2 flex flex-col gap-2 rounded-md p-2"
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
                    {t('action.select')}
                  </span>
                  {selected.map((item) => (
                    <button
                      key={item.id}
                      onClick={handleRemove(item as TAnalysisData)}
                      className="mb-2 flex flex-col gap-2 rounded-md bg-card p-2 hover:bg-accent hover:text-accent-foreground"
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
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
