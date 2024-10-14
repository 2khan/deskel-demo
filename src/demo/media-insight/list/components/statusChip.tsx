import { TIcon } from '@/shared/types/utils/icon'
import { TRow } from '../view'
import { CheckIcon, MessageCircleWarningIcon, XIcon } from 'lucide-react'
import { ParseKeys } from 'i18next'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { dx } from '@/shared/design-system/typography'

type TProps = {
  status: Exclude<TRow['status'], 'in_progress'>
}

type TStatusItem = {
  label: ParseKeys<'demo'>
  icon: TIcon | null
  style: string
}

const statusMap = {
  draft: {
    label: 'media-insight.status.draft',
    icon: null,
    style: 'bg-primary text-primary-foreground'
  },
  completed: {
    label: 'media-insight.status.completed',
    icon: CheckIcon,
    style: 'bg-background text-primary border-border'
  },
  cancelled: {
    label: 'media-insight.status.cancelled',
    icon: XIcon,
    style: 'border-border bg-muted text-muted-foreground'
  },
  error: {
    label: 'media-insight.status.error',
    icon: MessageCircleWarningIcon,
    style: 'bg-destructive text-destructive-foreground'
  }
} satisfies Record<Exclude<TRow['status'], 'in_progress'>, TStatusItem>

export default function StatusChip(props: TProps) {
  const { t } = useTranslation('demo')
  const { status } = props
  const { icon: Icon, label, style } = statusMap[status]
  return (
    <div
      className={cn(
        'flex w-max items-center gap-1 rounded border border-transparent px-1.5 py-0.5',
        style
      )}
    >
      {Icon && <Icon size={15} />}
      <span className={dx('label-01')}>{t(label)}</span>
    </div>
  )
}
