import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useTranslation } from 'react-i18next'

export default function Log() {
  const { t } = useTranslation('common')
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border">
      <ScrollArea className="flex h-60 flex-col p-2">
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed bg-muted text-muted-foreground">
          {t('status.empty')}
        </div>
        <ScrollBar />
      </ScrollArea>
    </div>
  )
}
