import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useNotification } from './useNotification'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslation } from 'react-i18next'
import { dx } from '@/shared/design-system/typography'
import { BellIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'

export default function Notification() {
  const { t } = useTranslation()
  const { data } = useNotification()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellIcon />
          {data.length > 0 && (
            <div className="absolute right-0 top-0 size-2 animate-ping rounded-full bg-primary" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="flex w-96 flex-col gap-1 bg-background/50 p-0 shadow-primary/10 backdrop-blur-lg"
      >
        <div className="px-2 py-0.5">
          <span className={dx('label-02', 'font-bold')}>Notification</span>
        </div>
        <Separator />
        <ScrollArea className="h-60 px-2 py-0.5">
          {data.length > 0 ? (
            <div className="flex w-full flex-col gap-4">
              {data.map((n) => (
                <div key={n.message} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={dx(
                        'label-01',
                        'block w-max shrink-0 rounded-full border bg-background px-2 py-1 text-center uppercase text-primary'
                      )}
                    >
                      {n.label}
                    </span>

                    <span
                      className={dx(
                        'label-01',
                        'shrink-0 text-muted-foreground'
                      )}
                    >
                      {n.created_at}
                    </span>
                  </div>
                  <span
                    className={dx(
                      'body-compact-01',
                      'block grow text-foreground'
                    )}
                  >
                    {n.message}
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
