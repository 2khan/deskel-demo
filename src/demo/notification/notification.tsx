import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { BellIcon } from 'lucide-react'
import { useNotification } from './useNotification'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslation } from 'react-i18next'
import { dx } from '@/shared/design-system/typography'

export default function Notification() {
  const { t } = useTranslation()
  const { data } = useNotification()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellIcon size={15} />
          {data.length > 0 && (
            <div className="absolute right-0 top-0 size-2 animate-ping rounded-full bg-primary" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="w-96 bg-background/50 shadow-primary/10 backdrop-blur-lg"
      >
        <ScrollArea className="h-60">
          {data.length > 0 ? (
            <div className="flex w-full flex-col gap-4">
              {data.map((n) => (
                <div key={n.message} className="flex items-center gap-2">
                  <span
                    className={dx(
                      'label-01',
                      'block rounded-full bg-primary px-2 py-1 uppercase text-primary-foreground'
                    )}
                  >
                    {n.label}
                  </span>
                  <span
                    className={dx('body-compact-01', 'block grow text-primary')}
                  >
                    {n.message}
                  </span>
                  <span className={dx('label-01', 'text-muted-foreground')}>
                    {n.created_at}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full grow flex-col items-center justify-center">
              {t('status.empty')}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
