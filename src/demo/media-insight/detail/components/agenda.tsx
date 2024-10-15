import { dx } from '@/shared/design-system/typography'
import { CheckCircleIcon, CircleIcon, LoaderIcon } from 'lucide-react'
import { TStage } from '../data'
import { useTranslation } from 'react-i18next'
import { useStage } from '../useStage'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { m } from 'framer-motion'

const groupedStages = [
  ['create-draft'],
  ['analysis-ready', 'start-analysis'],
  ['crawling-domains', 'categorizing-data', 'preparing-analysis'],
  ['download-report']
] as TStage[][]

export default function Agenda() {
  const { t } = useTranslation('demo')
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
        <div key={i} className="flex w-full gap-2">
          <div className="mt-1.5 flex size-6 items-center justify-center rounded-full bg-background">
            <span className={dx('label-01')}>{i + 1}</span>
          </div>
          <div className="flex grow flex-col gap-2">
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
                  {isLoading && (
                    <LoaderIcon size={15} className="animate-spin" />
                  )}
                  {!completed && !isLoading && <CircleIcon size={15} />}
                  <m.span
                    key={`${active}`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0, 1] }}
                    className={dx('body-01')}
                  >
                    {t(`media-insight.stage.${stage}`)}
                  </m.span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
