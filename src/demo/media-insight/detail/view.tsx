import { Button } from '@/components/ui/button'
import Agenda from './components/agenda'
import Chat from './components/chat'
import Info from './components/info'
import Log from './components/log'
import { useStage } from './useStage'
import { RocketIcon } from 'lucide-react'
import { useEffect } from 'react'
import { TStage } from './data'
import { includes } from 'lodash'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const autoNextStages = [
  'crawling-domains',
  'categorizing-data',
  'preparing-analysis'
] satisfies TStage[]

export default function MediaInsightDetail() {
  const { t } = useTranslation('demo')
  const { stage, next } = useStage()

  useEffect(() => {
    let timerID: NodeJS.Timeout
    if (includes(autoNextStages, stage)) {
      timerID = setTimeout(() => {
        next()
      }, 1000)
    }

    return () => {
      if (timerID) {
        clearTimeout(timerID)
      }
    }
  }, [stage, next])

  return (
    <div className="flex h-full w-full grow gap-3">
      <Chat />
      <ScrollArea className="h-full w-full max-w-80">
        <div className="flex w-full flex-col gap-3">
          <Info />
          <Button
            disabled={!(stage === 'start-analysis')}
            size="lg"
            className={cn(
              'w-full gap-2',
              stage === 'start-analysis' && 'animate-bounce'
            )}
            onClick={next}
          >
            <span>{t('media-insight.stage.start-analysis')}</span>{' '}
            <RocketIcon size={15} />
          </Button>
          <Agenda />
          <Log />
        </div>
        <ScrollBar />
      </ScrollArea>
    </div>
  )
}
