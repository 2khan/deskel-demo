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

type TProps = {
  state?: 'draft' | 'complete'
}

export default function ChatView(props: TProps) {
  const { state = 'draft' } = props
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
      <div
        className="absolute left-0 top-0 z-10 flex items-center justify-between gap-2"
        style={{ height: CHAT_HEADER }}
      >
        <TabsList>
          <TabsTrigger value="global-media-insight">
            {t('glossary.new-media-insight')}
          </TabsTrigger>
          <TabsTrigger value="sns">{t('glossary.new-sns')}</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        value="global-media-insight"
        className="mt-0 flex h-full w-full grow gap-3"
        style={{
          paddingTop: CHAT_HEADER + CONTENT_PADDING
        }}
      >
        <Chat
          input={stageData['current-input']}
          history={stageData['chat-history']}
        />
        <Dialog>
          <ScrollArea className="h-full w-full max-w-80">
            <div className="flex w-full flex-col gap-3">
              <Info info={stageData.info} />
              <Actions action={stageData.action} />
              <Agenda info={stageData.info} />
              <Log logs={stageData['log-history']} />
            </div>
          </ScrollArea>
        </Dialog>
      </TabsContent>
    </Tabs>
  )
}
