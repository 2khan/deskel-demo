import { dx } from '@/shared/design-system/typography'
import { useStage } from '../useStage'
import { StageDataMap } from '../data'
import { XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Info() {
  const { t } = useTranslation('demo')
  const { stage } = useStage()
  const info = StageDataMap[stage]['info']
  return (
    <div className="flex flex-col gap-3 rounded-xl border px-3 py-2">
      <div className="flex items-center justify-between gap-1">
        <span className={dx('label-01', 'text-muted-foreground')}>
          {t('media-insight.columns.organization-name')}:
        </span>
        <span className={dx('label-01', 'text-end text-foreground')}>
          {info.organization_name}
        </span>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span className={dx('label-01', 'text-muted-foreground')}>
          {t('media-insight.info.date-range')}:
        </span>
        <span className={dx('label-01', 'text-end text-foreground')}>
          {info.range}
        </span>
      </div>
      <div className="flex items-start justify-between gap-1">
        <span className={dx('label-01', 'text-muted-foreground')}>
          {t('media-insight.columns.homepages')}:
        </span>
        <div
          className={dx(
            'label-01',
            'flex flex-wrap justify-end gap-1 text-foreground'
          )}
        >
          {info.homepage_domains.length > 0
            ? info.homepage_domains.map((domain) => (
                <div
                  className="group relative rounded-full bg-muted px-2 py-0.5"
                  key={domain}
                >
                  <div className="absolute right-0.5 rounded-full bg-destructive p-0.5 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    <XIcon size={12} />
                  </div>
                  {domain}
                </div>
              ))
            : '-'}
        </div>
      </div>
    </div>
  )
}
