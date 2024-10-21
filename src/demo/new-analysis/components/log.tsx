import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { TLog } from '@/demo/common/stages'
import { dx } from '@/shared/design-system/typography'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

type TProps = {
  logs: TLog[]
}

export default function Log(props: TProps) {
  const { t } = useTranslation('demo')
  const { logs } = props
  const logBottomRef = useRef<HTMLDivElement>(null)

  // scroll to top on log
  useEffect(() => {
    if (logBottomRef.current) {
      logBottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-2xl border p-2">
      <span className={dx('heading-compact-01')}>
        {t('media-insight.tabs.logs')}
      </span>
      <ScrollArea className="h-40 rounded-xl">
        <div
          className={dx(
            'code-01',
            'h-full w-full bg-muted p-2 text-muted-foreground'
          )}
        >
          <div className="flex h-max flex-col gap-2">
            {logs.map(({ message, created_at }) => (
              <div key={message} className="flex flex-col justify-between">
                <span className={dx('code-01', 'text-foreground')}>
                  {message}
                </span>
                <span className={dx('label-01', 'text-muted-foreground')}>
                  {created_at}
                </span>
              </div>
            ))}
          </div>
          <div ref={logBottomRef} />
        </div>
        <ScrollBar />
      </ScrollArea>
    </div>
  )
}
