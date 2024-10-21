import { Button } from '@/components/ui/button'
import Agenda from './components/agenda'
import Chat from './components/chat'
import Info from './components/info'
import Log from './components/log'
import { useStage } from './useStage'
import { RocketIcon, XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { TStage } from './data'
import { includes } from 'lodash'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAddNotification } from '@/demo/notification/useNotification'
import { format } from 'date-fns'
import { useStatusbar } from '@/shared/stores/statusbar'

const autoNextStages = [
  'crawling-domains',
  'categorizing-data',
  'preparing-analysis'
] satisfies TStage[]

export default function MediaInsightDetail() {
  const { mutate } = useAddNotification()
  const { t } = useTranslation('demo')
  const { t: commonTranslation } = useTranslation('common')
  const { stage, next } = useStage()
  const { setTitle } = useStatusbar()

  const isAuto = includes(autoNextStages, stage)

  useEffect(() => {
    let timerID: NodeJS.Timeout
    if (isAuto) {
      timerID = setTimeout(() => {
        next()
      }, 1000)
    }

    return () => {
      if (timerID) {
        clearTimeout(timerID)
      }
    }
  }, [stage, isAuto, next])

  useEffect(() => {
    if (stage === 'create-draft-range') {
      setTitle(
        `${commonTranslation('glossary.new-media-insight')}: Company Inc`
      )
    }
    if (stage === 'create-draft-homepage-domains') {
      setTitle(
        `${commonTranslation('glossary.new-media-insight')}: Company Inc (2024/06/02 - 2024/09/02)`
      )
    }
    if (stage === 'download-report') {
      mutate({
        message:
          'Your report on Company Inc (2024/06/02 - 2024/09/02) is now ready',
        label: 'Media Insight',
        created_at: format(new Date(), 'yyyy/MM/dd HH:mm')
      })
    }
  }, [commonTranslation, stage, mutate, setTitle])

  const handleClick = () => {
    if (!(stage === 'start-analysis')) return
    if (isAuto) return
    next()
  }

  return (
    <div className="flex h-full w-full grow gap-3">
      <Chat />
      <ScrollArea className="h-full w-full max-w-80">
        <div className="flex w-full flex-col gap-3">
          <Info />
          <Button
            disabled={!(stage === 'start-analysis') && !isAuto}
            size="lg"
            className={cn(
              'w-full gap-2',
              stage === 'start-analysis' && 'animate-bounce'
            )}
            onClick={handleClick}
            variant={isAuto ? 'destructive' : 'default'}
          >
            <span>
              {isAuto
                ? commonTranslation('action.cancel')
                : t('media-insight.stage.start-analysis')}
            </span>
            {isAuto ? <XIcon size={15} /> : <RocketIcon size={15} />}
          </Button>
          <Agenda />
          <Log />
        </div>
      </ScrollArea>
    </div>
  )
}
