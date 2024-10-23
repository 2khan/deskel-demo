import { ScrollArea } from '@/components/ui/scroll-area'
import Chat from '../common/components/chat'
import Info from '../common/components/info'
import Actions from '../common/components/actions'
import Agenda from '../common/components/agenda'
import Log from '../common/components/log'

// STAGE LOGIC
import { useStage } from '../common/useStage'
import {
  data,
  IStageData,
  stages,
  TStageData,
  autoNextStages
} from '../common/stages'
import { useEffect } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'
import { CHAT_HEADER, CONTENT_PADDING } from '@/shared/constants/layout'
import { Button } from '@/components/ui/button'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { format, sub } from 'date-fns'
import { now } from '../common/constants'
import { TThreadData } from '../common/threads-menu/gen-script'
import { dx } from '@/shared/design-system/typography'
import Multiselect from '../common/multiselect/view'

type TProps = {
  state?: 'draft' | 'complete'
  threadData?: TThreadData
  isMultistep?: boolean
}

export default function ChatView(props: TProps) {
  const { state = 'draft', threadData, isMultistep } = props
  const { t } = useTranslation()
  const { index, next, goto } = useStage()

  const stageData = stages.reduce<TStageData>((merged, n, i) => {
    const next = data[n]
    if (i > index || !next) return merged

    return {
      'current-input': next['current-input'],
      'chat-history': merged['chat-history'].concat(next['chat-history']),
      info: Object.assign({}, merged['info'], next['info']),
      'log-history': merged['log-history'].concat(next['log-history']),
      action: next['action']
    }
  }, IStageData)

  // AUTO-NEXT
  useEffect(() => {
    let timerId: NodeJS.Timeout
    const currentStage = stages[index]
    if (autoNextStages.includes(currentStage)) {
      timerId = setTimeout(() => {
        next()
      }, 2000)
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [index, next])

  useEffect(() => {
    if (state === 'complete') {
      goto(stages.length - 1)
      return
    }
    goto(0)
  }, [state, goto])

  return (
    <Tabs
      className="relative flex h-full w-full grow flex-col items-start"
      value="global-media-insight"
    >
      {!isMultistep && (
        <div
          className="absolute left-0 top-0 z-10 flex w-full items-center justify-between gap-2"
          style={{ height: CHAT_HEADER }}
        >
          <TabsList>
            <TabsTrigger value="global-media-insight">
              {t('glossary.new-media-insight')}
            </TabsTrigger>
            <TabsTrigger value="sns">{t('glossary.new-sns')}</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            {threadData && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="gap-1" variant="outline">
                    <CounterClockwiseClockIcon />
                    History
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <SheetHeader>
                    <SheetTitle>Chat History</SheetTitle>
                    <SheetDescription>
                      {`${format(sub(now, { months: 1 }), 'yyyy/MM/dd')} - ${format(now, 'yyyy/MM/dd')}`}
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="grow rounded-2xl border bg-muted p-2">
                    {threadData.threads.length > 0 ? (
                      <div className="flex flex-col bg-card p-2">
                        {threadData.threads
                          .sort(
                            (a, b) =>
                              new Date(b.created_date).getTime() -
                              new Date(a.created_date).getTime()
                          )
                          .map((thread) => (
                            <div
                              key={thread.id}
                              className="flex grow gap-2"
                              style={{ height: 54 }}
                            >
                              <span
                                style={{
                                  transform: 'translate(0, 10px)'
                                }}
                                className={dx(
                                  'label-01',
                                  'block w-16 shrink-0 text-muted-foreground'
                                )}
                              >
                                {format(thread.created_date, 'MM/dd HH:mm')}
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
                              <SheetClose asChild>
                                <div className="grow rounded-lg p-2 hover:bg-accent hover:text-accent-foreground">
                                  <span
                                    className={dx(
                                      'body-compact-01',
                                      'line-clamp-2 text-start'
                                    )}
                                  >
                                    {thread.title}
                                  </span>
                                </div>
                              </SheetClose>
                            </div>
                          ))}
                      </div>
                    ) : (
                      t('status.empty')
                    )}
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      )}
      <TabsContent
        value="global-media-insight"
        className="mt-0 flex h-full w-full grow gap-3"
        style={{
          paddingTop: !isMultistep ? CHAT_HEADER + CONTENT_PADDING : 0
        }}
      >
        <Chat
          input={stageData['current-input']}
          history={stageData['chat-history']}
        />
        <ScrollArea className="h-full w-full max-w-80">
          <div className="flex w-full flex-col gap-3">
            {!isMultistep && <Info info={stageData.info} />}
            {isMultistep && <Multiselect />}
            <Dialog>
              <Actions action={stageData.action} />
              <Agenda info={stageData.info} />
            </Dialog>
            <Log logs={stageData['log-history']} />
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}
