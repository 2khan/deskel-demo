import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { dx } from '@/shared/design-system/typography'
import { useTranslation } from 'react-i18next'

export default function Log() {
  const { t: commonTranslation } = useTranslation('common')
  const { t } = useTranslation('demo')
  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-2xl border p-2">
      <span className={dx('heading-compact-01')}>
        {t('media-insight.tabs.logs')}
      </span>
      <ScrollArea className="flex h-60 flex-col">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed bg-muted text-muted-foreground">
          {commonTranslation('status.empty')}
        </div>
        <ScrollBar />
      </ScrollArea>
    </div>
  )
}
