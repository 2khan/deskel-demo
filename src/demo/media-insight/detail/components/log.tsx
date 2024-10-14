import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'
import { useStage } from '../useStage'
import { dx } from '@/shared/design-system/typography'
import { format } from 'date-fns'
import { DownloadIcon, FullscreenIcon } from 'lucide-react'
import TooltipButton from '@/components/custom/TooltipButton'

export default function Log() {
  const { t } = useTranslation('common')
  const { stage } = useStage()
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border">
      <Tabs defaultValue="reports">
        <TabsList className="h-12 w-full items-stretch rounded-b-none border-b p-2">
          <TabsTrigger className="grow rounded-xl" value="reports">
            Reports
          </TabsTrigger>
          <TabsTrigger className="grow rounded-xl" value="logs">
            Logs
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex h-60 flex-col p-2">
          <TabsContent value="reports" className="mt-0 h-full w-full">
            {stage === 'download-report' ? (
              <div className="flex w-full items-center justify-between gap-2 rounded-xl border p-2">
                <div className="flex flex-col gap-1">
                  <span className={dx('heading-compact-01', 'text-primary')}>
                    2024/06/02 - 2024/09/02
                  </span>
                  <span
                    className={dx('body-compact-01', 'text-muted-foreground')}
                  >
                    {format(new Date(), 'yyyy/MM/dd HH:mm')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <TooltipButton
                    helper={t('action.view-file')}
                    size="icon"
                    variant="outline"
                    className="text-primary"
                  >
                    <FullscreenIcon size={15} />
                  </TooltipButton>

                  <TooltipButton
                    helper={t('action.download-file')}
                    size="icon"
                    variant="outline"
                    className="text-primary"
                  >
                    <DownloadIcon size={15} />
                  </TooltipButton>
                </div>
              </div>
            ) : (
              <div className="flex h-full w-full grow flex-col items-center justify-center rounded-xl border border-dashed bg-muted text-muted-foreground">
                {t('status.empty')}
              </div>
            )}
          </TabsContent>

          <TabsContent value="logs" className="mt-0 h-full w-full">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed bg-muted text-muted-foreground">
              {t('status.empty')}
            </div>
          </TabsContent>
          <ScrollBar />
        </ScrollArea>
      </Tabs>
    </div>
  )
}
