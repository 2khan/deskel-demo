import { dx } from '@/shared/design-system/typography'
import {
  CheckCircleIcon,
  CircleIcon,
  DownloadIcon,
  FullscreenIcon,
  LoaderIcon
} from 'lucide-react'
import { TStage } from '../data'
import { useTranslation } from 'react-i18next'
import { useStage } from '../useStage'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { m } from 'framer-motion'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import TooltipButton from '@/components/custom/TooltipButton'
import PPT from './ppt'

const groupedStages = [
  ['create-draft'],
  ['analysis-ready', 'start-analysis'],
  ['crawling-domains', 'categorizing-data', 'preparing-analysis'],
  ['download-report']
] as TStage[][]

export default function Agenda() {
  const { t } = useTranslation('demo')
  const { t: commonTranslation } = useTranslation('common')
  const { stage: augStage } = useStage()

  const completedStages = useMemo(() => {
    const arr: TStage[] = []
    let found = false

    for (const stages of groupedStages) {
      if (found) break
      for (const stage of stages) {
        if (augStage.includes(stage)) {
          found = true
          break
        } else {
          arr.push(stage)
        }
      }
    }

    return arr
  }, [augStage])

  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border bg-muted p-2 text-muted-foreground">
      {groupedStages.map((stages, i) => (
        <div key={i} className="flex grow flex-col gap-2">
          {stages.map((stage) => {
            const completed = completedStages.includes(stage)
            const active = augStage.includes(stage)
            const isLoading = active && groupedStages[2].includes(stage)
            return (
              <div
                key={stage}
                className={cn(
                  'flex grow items-center gap-2 rounded-xl bg-background p-2',
                  completed && 'text-primary',
                  active && 'text-foreground'
                )}
              >
                {completed && <CheckCircleIcon size={15} />}
                {isLoading && <LoaderIcon size={15} className="animate-spin" />}
                {!completed && !isLoading && <CircleIcon size={15} />}
                <m.span
                  key={`${active}`}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0, 1] }}
                  className={dx('body-01', 'block grow')}
                >
                  {t(`media-insight.stage.${stage}`)}
                </m.span>

                {augStage === 'download-report' &&
                  stage === 'download-report' && (
                    <div className="flex gap-1.5">
                      <Dialog>
                        <DialogTrigger asChild>
                          <TooltipButton
                            helper={commonTranslation('action.view-file')}
                            size="icon-sm"
                            variant="outline"
                            className="relative text-primary"
                          >
                            <FullscreenIcon size={15} />
                            <div className="absolute right-0 top-0 size-2 animate-ping rounded-full bg-primary" />
                          </TooltipButton>
                        </DialogTrigger>
                        <PPT />
                      </Dialog>

                      <TooltipButton
                        helper={commonTranslation('action.download-file')}
                        size="icon-sm"
                        variant="outline"
                        className="text-primary"
                      >
                        <DownloadIcon size={15} />
                      </TooltipButton>
                    </div>
                  )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
