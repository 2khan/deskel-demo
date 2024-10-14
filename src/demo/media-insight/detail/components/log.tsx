import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

export default function Log() {
  const { t } = useTranslation('common')
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
            <div className="flex h-full w-full grow flex-col items-center justify-center rounded-xl border border-dashed bg-muted text-muted-foreground">
              {t('status.empty')}
            </div>
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
