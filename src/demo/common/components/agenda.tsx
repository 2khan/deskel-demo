import { dx } from '@/shared/design-system/typography'
import {
  CheckCircleIcon,
  CircleIcon,
  DownloadIcon,
  FullscreenIcon,
  LoaderIcon
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { m } from 'framer-motion'
import { useStage } from '@/demo/common/useStage'
import PPT from '@/demo/common/components/ppt'
import {
  groupedStages,
  stages,
  TGroup,
  autoNextStages,
  TInfo
} from '@/demo/common/stages'
import { findIndex } from 'lodash'
import { DialogTrigger } from '@/components/ui/dialog'
import TooltipButton from '@/components/custom/TooltipButton'

type TProps = {
  info: TInfo
}

export default function Agenda(props: TProps) {
  const { info } = props
  const { t } = useTranslation('demo')
  const { index } = useStage()

  const currentStage = stages[index]

  const currentGroupIndex = useMemo(
    () =>
      findIndex(Object.keys(groupedStages), (key) =>
        groupedStages[key as TGroup].includes(currentStage)
      ),
    [currentStage]
  )

  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border bg-muted p-2 text-muted-foreground">
      <div className="flex grow flex-col gap-2">
        {Object.keys(groupedStages).map((key, i) => {
          const isCompleted = currentGroupIndex >= i
          const isActive = currentGroupIndex + 1 === i
          const isLoading = isActive && autoNextStages.includes(currentStage)
          return (
            <div
              key={key}
              className={cn(
                'flex grow items-center gap-2 rounded-xl bg-background p-2',
                isActive && 'text-foreground',
                isCompleted && 'text-primary'
              )}
            >
              {isCompleted && <CheckCircleIcon size={15} />}
              {isLoading && <LoaderIcon size={15} className="animate-spin" />}
              {!isCompleted && !isLoading && <CircleIcon size={15} />}
              <m.span
                key={`${isActive}`}
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0, 1] }}
                className={dx('body-01', 'block grow')}
              >
                {t(`media-insight.stage.${key as TGroup}`)}
              </m.span>

              {(key as TGroup) === 'download-report' && isActive && (
                <div className="flex gap-2">
                  <DialogTrigger asChild>
                    <TooltipButton
                      helper={t('media-insight.action.view-file')}
                      size="icon-sm"
                      variant="outline"
                      className="relative text-primary"
                    >
                      <FullscreenIcon size={15} />
                      <div className="absolute right-0 top-0 size-2 animate-ping rounded-full bg-primary" />
                    </TooltipButton>
                  </DialogTrigger>
                  <PPT
                    title={info.organization_name}
                    description={info.range}
                  />

                  <TooltipButton
                    helper={t('media-insight.action.download-file')}
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
    </div>
  )
}
