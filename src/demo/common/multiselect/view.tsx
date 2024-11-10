import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useTranslation } from 'react-i18next'

import mockData from './output.json'
import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { dx } from '@/shared/design-system/typography'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { TAnalysisData } from './gen-script'
import Footer from './components/footer'
import { CheckCircledIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { X } from 'lucide-react'

const comparisonTypes = ['same', 'cross'] as const
type TComparisonType = (typeof comparisonTypes)[number]

export default function Multiselect() {
  const { t } = useTranslation()
  const { t: demoText } = useTranslation('demo')
  const [comparisonType, setComparisonType] = useState<TComparisonType>()
  const [selectedOrganization, setSelectedOrganization] =
    useState<TAnalysisData>()
  const [request, setRequest] = useState<{
    source?: {
      analysis: TAnalysisData
      thread: TAnalysisData['threads'][number]
    }
    target?: {
      analysis: TAnalysisData
      thread: TAnalysisData['threads'][number]
    }
  }>({
    source: undefined,
    target: undefined
  })

  const data = useMemo(() => mockData, []) as TAnalysisData[]

  const sourceAnalysis = useMemo(
    () => request.source?.analysis ?? selectedOrganization,
    [request, selectedOrganization]
  )

  const targetAnalysis = useMemo(
    () =>
      request.target?.analysis ??
      (comparisonType == 'cross'
        ? selectedOrganization
        : request.source?.analysis),
    [request, selectedOrganization, comparisonType]
  )

  return (
    <Dialog>
      <div className="flex w-full flex-col gap-2">
        {comparisonTypes.map((type) => {
          const isActive = comparisonType === type
          return (
            <DialogTrigger key={type} asChild>
              <button
                className={cn(
                  'flex cursor-pointer gap-2 rounded-lg border bg-card p-2 text-start text-card-foreground hover:bg-accent',
                  isActive && 'border-primary'
                )}
                onClick={() => setComparisonType(type)}
              >
                <div
                  className={cn(
                    'flex size-4 shrink-0 translate-y-0.5 items-center justify-center rounded-full border',
                    isActive && 'border-primary'
                  )}
                >
                  {isActive && (
                    <div className="size-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className={dx('heading-compact-01')}>
                    {demoText(`comparison-type.${type}.title`)}
                  </span>
                  <span className={dx('label-01', 'text-muted-foreground')}>
                    {demoText(`comparison-type.${type}.description`)}
                  </span>
                </div>
              </button>
            </DialogTrigger>
          )
        })}
      </div>
      {comparisonType && (
        <DialogContent className="max-w-screen-md gap-0 p-0">
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
              <div className="flex">
                <ScrollArea
                  className="h-full w-full grow border-r"
                  style={{ height: 480, maxWidth: 320 }}
                >
                  <CommandGroup heading="Organizations">
                    <div className="flex flex-col gap-2 p-1 pr-3">
                      {data
                        .sort((a, b) =>
                          a.organization_name.localeCompare(b.organization_name)
                        )
                        .map((analysis) => {
                          const selected = selectedOrganization === analysis
                          return (
                            <CommandItem
                              key={analysis.id}
                              value={analysis.organization_name}
                              className={dx(
                                'label-01',
                                'justify-between',
                                selected && 'text-primary'
                              )}
                              onSelect={() => setSelectedOrganization(analysis)}
                            >
                              {analysis.organization_name}
                              {selected && <ChevronRightIcon />}
                            </CommandItem>
                          )
                        })}
                    </div>
                  </CommandGroup>
                </ScrollArea>
                <div className="flex grow flex-col">
                  <ScrollArea
                    className={cn('h-full w-full border-b bg-card')}
                    style={{ height: 240 }}
                  >
                    <div className="sticky top-0 z-10 flex w-full justify-between border-b bg-card px-2 py-1.5 leading-1">
                      <span
                        className={dx(
                          'label-01',
                          'font-medium text-muted-foreground'
                        )}
                      >
                        #1: {sourceAnalysis?.organization_name}
                      </span>
                      {request.source && (
                        <button
                          className="size-4 text-destructive hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          onClick={() =>
                            setRequest((prev) => ({
                              ...prev,
                              source: undefined
                            }))
                          }
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                    <div className="flex grow flex-col p-1 pr-3">
                      {sourceAnalysis &&
                        sourceAnalysis.threads
                          .sort(
                            (a, b) =>
                              new Date(b.end_date).getTime() -
                              new Date(a.end_date).getTime()
                          )
                          .map((thread) => {
                            const date = format(
                              thread.end_date,
                              'yyyy/MM/dd HH:mm'
                            )
                            const selected =
                              request.source?.thread.id === thread.id
                            return (
                              <button
                                key={thread.id}
                                className="flex grow items-start gap-2 rounded-lg px-2 py-0 hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                style={{ height: 54 }}
                                disabled={
                                  request.target?.thread.id === thread.id
                                }
                                onClick={() => {
                                  if (!selected) {
                                    setRequest((prev) => ({
                                      ...prev,
                                      source: {
                                        ...prev.source,
                                        thread,
                                        analysis: sourceAnalysis
                                      }
                                    }))
                                  } else {
                                    setRequest((prev) => ({
                                      ...prev,
                                      source: undefined
                                    }))
                                  }
                                }}
                              >
                                <span
                                  style={{
                                    transform: 'translate(0, 10px)'
                                  }}
                                  className={dx(
                                    'label-01',
                                    'block w-24 shrink-0 text-muted-foreground'
                                  )}
                                >
                                  {date}
                                </span>
                                <div className="relative h-full w-px bg-border">
                                  <div
                                    className="absolute rounded-full bg-card"
                                    style={{
                                      top: 0,
                                      left: 0,
                                      width: 7,
                                      height: 7,
                                      transform: 'translate(-3px, 14px)'
                                    }}
                                  />
                                  <div
                                    className="absolute rounded-full bg-primary"
                                    style={{
                                      top: 0,
                                      left: 0,
                                      width: 5,
                                      height: 5,
                                      transform: 'translate(-2px, 15px)'
                                    }}
                                  />
                                </div>
                                <div
                                  className={cn(
                                    'flex grow items-center justify-between py-2',
                                    selected && 'text-primary'
                                  )}
                                >
                                  <span className={dx('label-01')}>
                                    {t(`glossary.${thread.type}`)}
                                  </span>
                                  {selected && <CheckCircledIcon />}
                                </div>
                              </button>
                            )
                          })}
                    </div>
                  </ScrollArea>
                  {request.source && (
                    <ScrollArea
                      className="h-full w-full bg-card"
                      style={{ height: 240 }}
                    >
                      <div className="sticky top-0 z-10 flex w-full justify-between border-b bg-card px-2 py-1.5 leading-1">
                        <span
                          className={dx(
                            'label-01',
                            'font-medium text-muted-foreground'
                          )}
                        >
                          #2: {targetAnalysis?.organization_name}
                        </span>
                        {request.target && (
                          <button
                            className="size-4 text-destructive hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            onClick={() =>
                              setRequest((prev) => ({
                                ...prev,
                                target: undefined
                              }))
                            }
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                      <div className="flex grow flex-col p-1 pr-3">
                        {targetAnalysis &&
                          targetAnalysis.threads
                            .sort(
                              (a, b) =>
                                new Date(b.end_date).getTime() -
                                new Date(a.end_date).getTime()
                            )
                            .map((thread) => {
                              const date = format(
                                thread.end_date,
                                'yyyy/MM/dd HH:mm'
                              )
                              const selected =
                                request.target?.thread.id === thread.id
                              return (
                                <button
                                  key={thread.id}
                                  className="flex grow items-start gap-2 rounded-lg px-2 py-0 hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                  style={{ height: 54 }}
                                  disabled={
                                    request.source?.thread.id === thread.id
                                  }
                                  onClick={() => {
                                    if (!selected) {
                                      setRequest((prev) => ({
                                        ...prev,
                                        target: {
                                          ...prev.target,
                                          thread,
                                          analysis: targetAnalysis
                                        }
                                      }))
                                    } else {
                                      setRequest((prev) => ({
                                        ...prev,
                                        target: undefined
                                      }))
                                    }
                                  }}
                                >
                                  <span
                                    style={{
                                      transform: 'translate(0, 10px)'
                                    }}
                                    className={dx(
                                      'label-01',
                                      'block w-24 shrink-0 text-muted-foreground'
                                    )}
                                  >
                                    {date}
                                  </span>
                                  <div className="relative h-full w-px bg-border">
                                    <div
                                      className="absolute rounded-full bg-card"
                                      style={{
                                        top: 0,
                                        left: 0,
                                        width: 7,
                                        height: 7,
                                        transform: 'translate(-3px, 14px)'
                                      }}
                                    />
                                    <div
                                      className="absolute rounded-full bg-primary"
                                      style={{
                                        top: 0,
                                        left: 0,
                                        width: 5,
                                        height: 5,
                                        transform: 'translate(-2px, 15px)'
                                      }}
                                    />
                                  </div>
                                  <div
                                    className={cn(
                                      'flex grow items-center justify-between py-2',
                                      selected && 'text-primary'
                                    )}
                                  >
                                    <span className={dx('label-01')}>
                                      {t(`glossary.${thread.type}`)}
                                    </span>
                                    {selected && <CheckCircledIcon />}
                                  </div>
                                </button>
                              )
                            })}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </div>
              <Footer />
            </CommandList>
          </Command>
        </DialogContent>
      )}
    </Dialog>
  )
}
