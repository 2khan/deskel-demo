import { dx } from '@/shared/design-system/typography'
import { useStage } from '../useStage'
import { StageDataMap } from '../data'
import { useTranslation } from 'react-i18next'
import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { EditIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'

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
        {info.organization_name && (
          <m.span
            key={info.organization_name}
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={dx('label-01', 'block grow text-end text-foreground')}
          >
            {info.organization_name}
          </m.span>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
            >
              <EditIcon size={12} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="flex w-auto items-center gap-2 p-0"
            align="start"
            side="right"
          >
            <Input placeholder={t('media-insight.columns.organization-name')} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span className={dx('label-01', 'text-muted-foreground')}>
          {t('media-insight.info.date-range')}:
        </span>
        {info.range && (
          <m.span
            key={info.range}
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={dx('label-01', 'block grow text-end text-foreground')}
          >
            {info.range}
          </m.span>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
            >
              <EditIcon size={12} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start" side="right">
            <Calendar initialFocus mode="range" numberOfMonths={2} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span className={dx('label-01', 'text-muted-foreground')}>
          {t('media-insight.columns.homepages')}:
        </span>
        {info.homepage_domain && (
          <m.span
            key={info.homepage_domain}
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={dx('label-01', 'block grow text-end text-foreground')}
          >
            {info.homepage_domain}
          </m.span>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
            >
              <EditIcon size={12} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="flex w-auto items-center gap-2 p-0"
            align="start"
            side="right"
          >
            <Input placeholder={t('media-insight.columns.homepages')} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
