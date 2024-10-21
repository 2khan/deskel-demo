import { ScrollArea } from '@/components/ui/scroll-area'
import { dx } from '@/shared/design-system/typography'
import { useTranslation } from 'react-i18next'
import { TStage } from '../data'
import { useStage } from '../useStage'
import { useMemo } from 'react'
import { find } from 'lodash'

const logData = {
  'create-draft': [
    { message: 'Created draft.', created_at: '2024/09/02 12:32' }
  ],
  'analysis-ready': [
    { message: 'Created draft.', created_at: '2024/09/02 12:32' },
    { message: 'Inputs received.', created_at: '2024/09/02 12:32' }
  ],
  'start-analysis': [
    { message: 'Created draft.', created_at: '2024/09/02 12:32' },
    { message: 'Inputs received.', created_at: '2024/09/02 12:32' },
    { message: 'Awaiting start command...', created_at: '2024/09/02 12:32' }
  ],
  'crawling-domains': [
    { message: 'Created draft.', created_at: '2024/09/02 12:32' },
    { message: 'Inputs received.', created_at: '2024/09/02 12:32' },
    { message: 'Awaiting start command...', created_at: '2024/09/02 12:32' },
    { message: 'Crawling domains...', created_at: '2024/09/02 12:32' }
  ],
  'categorizing-data': [
    { message: 'Created draft.', created_at: '2024/09/02 12:32' },
    { message: 'Inputs received.', created_at: '2024/09/02 12:32' },
    { message: 'Awaiting start command...', created_at: '2024/09/02 12:32' },
    { message: 'Crawling domains...', created_at: '2024/09/02 12:32' },
    { message: 'Domains crawled.', created_at: '2024/09/02 12:32' },
    { message: 'Categorizing data...', created_at: '2024/09/02 12:32' }
  ],
  'preparing-analysis': [
    { message: 'Created draft.', created_at: '2024/09/02 12:32' },
    { message: 'Inputs received.', created_at: '2024/09/02 12:32' },
    { message: 'Awaiting start command...', created_at: '2024/09/02 12:32' },
    { message: 'Crawling domains...', created_at: '2024/09/02 12:32' },
    { message: 'Domains crawled.', created_at: '2024/09/02 12:32' },
    { message: 'Categorizing data...', created_at: '2024/09/02 12:32' },
    { message: 'Data categorized.', created_at: '2024/09/02 12:32' },
    { message: 'Preparing report file.', created_at: '2024/09/02 12:32' }
  ],
  'download-report': [
    { message: 'Created draft.', created_at: '2024/09/02 12:32' },
    { message: 'Inputs received.', created_at: '2024/09/02 12:32' },
    { message: 'Awaiting start command...', created_at: '2024/09/02 12:32' },
    { message: 'Crawling domains...', created_at: '2024/09/02 12:32' },
    { message: 'Domains crawled.', created_at: '2024/09/02 12:32' },
    { message: 'Categorizing data...', created_at: '2024/09/02 12:32' },
    { message: 'Data categorized.', created_at: '2024/09/02 12:32' },
    { message: 'Preparing report file.', created_at: '2024/09/02 12:32' },
    { message: 'File ready for download', created_at: '2024/09/02 12:32' }
  ]
} satisfies Record<TStage, { message: string; created_at: string }[]>

export default function Log() {
  const { t } = useTranslation('demo')
  const { stage } = useStage()

  const key = useMemo(() => {
    return find(Object.keys(logData), (key) => stage.includes(key))
  }, [stage])

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-2xl border p-2">
      <span className={dx('heading-compact-01')}>
        {t('media-insight.tabs.logs')}
      </span>
      <ScrollArea className="h-40">
        <div
          className={dx(
            'code-01',
            'h-full w-full rounded-xl bg-muted p-2 text-muted-foreground'
          )}
        >
          <div className="flex h-max flex-col-reverse gap-2">
            {logData[key as keyof typeof logData].map(
              ({ message, created_at }) => (
                <div key={message} className="flex flex-col justify-between">
                  <span className={dx('code-01', 'text-foreground')}>
                    {message}
                  </span>
                  <span className={dx('label-01', 'text-muted-foreground')}>
                    {created_at}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
