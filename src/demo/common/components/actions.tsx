import { Button } from '@/components/ui/button'
import { TAction } from '@/demo/common/stages'
import { useStage } from '@/demo/common/useStage'
import { cn } from '@/lib/utils'
import { TIcon } from '@/shared/types/utils/icon'
import { ParseKeys } from 'i18next'
import { FullscreenIcon, RocketIcon, XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { DialogTrigger } from '@/components/ui/dialog'

type TProps = {
  action: TAction
}

const ActionMap = {
  'pre-start': {
    label: 'media-insight.stage.start-analysis',
    icon: RocketIcon
  },
  start: {
    label: 'media-insight.stage.start-analysis',
    icon: RocketIcon
  },
  cancel: {
    label: 'media-insight.action.cancel',
    icon: XIcon
  },
  view: {
    label: 'media-insight.action.view-file',
    icon: FullscreenIcon
  }
} satisfies Record<TAction, { icon: TIcon; label: ParseKeys<'demo'> }>

export default function Actions(props: TProps) {
  const { next } = useStage()
  const { t } = useTranslation('demo')
  const { action } = props
  const { label, icon: Icon } = ActionMap[action]

  const handleClick = () => {
    if (action == 'start') {
      next()
    }
  }

  return action === 'view' ? (
    <DialogTrigger asChild>
      <Button size="lg" className={cn('w-full gap-2')} onClick={handleClick}>
        <span>{t(label)}</span>
        <Icon size={15} />
      </Button>
    </DialogTrigger>
  ) : (
    <Button
      disabled={action === 'pre-start'}
      size="lg"
      className={cn('w-full gap-2')}
      onClick={handleClick}
      variant={action === 'cancel' ? 'destructive' : 'default'}
    >
      <span>{t(label)}</span>
      <Icon size={15} />
    </Button>
  )
}
