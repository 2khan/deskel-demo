import { dx } from '@/shared/design-system/typography'
import { useStage } from '../useStage'
import { StageDataMap } from '../data'
import { useTranslation } from 'react-i18next'
import { m } from 'framer-motion'

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
        <m.span
          key={info.organization_name}
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={dx('label-01', 'text-end text-foreground')}
        >
          {info.organization_name}
        </m.span>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span className={dx('label-01', 'text-muted-foreground')}>
          {t('media-insight.info.date-range')}:
        </span>
        <m.span
          key={info.range}
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={dx('label-01', 'text-end text-foreground')}
        >
          {info.range}
        </m.span>
      </div>
      <div className="flex items-start justify-between gap-1">
        <span className={dx('label-01', 'text-muted-foreground')}>
          {t('media-insight.columns.homepages')}:
        </span>
        <m.span
          key={info.homepage_domain}
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={dx('label-01', 'text-end text-foreground')}
        >
          {info.homepage_domain}
        </m.span>
      </div>
    </div>
  )
}
