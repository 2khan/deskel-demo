import { useStatusbar } from '@/shared/stores/statusbar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

// UTILS
import { dx } from '@/shared/design-system/typography'
import { HEADER_HEIGHT } from '@/shared/constants/layout'

// DEMO
import { lazy, Suspense } from 'react'
import { SidebarIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSidebar } from '@/shared/stores/sidebar'
import { Button } from '@/components/ui/button'

const Notification = lazy(() => import('@/demo/notification/notification'))
const ChangeLanguage = lazy(() => import('@/components/custom/ChangeLanguage'))
const ChangeTheme = lazy(() => import('@/components/custom/ChangeTheme'))

export default function StatusBar() {
  const { t } = useTranslation()
  const { title, description } = useStatusbar()
  const { toggle } = useSidebar()

  return (
    <header
      className="col-span-12 flex items-center justify-between gap-2 border-b px-3 py-2 xl:px-6 xl:py-4"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={toggle} variant="outline" size="icon">
              <SidebarIcon size={15} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('action.toggle-sidebar')}</TooltipContent>
        </Tooltip>
        <div className="flex flex-col">
          {title && <h1 className={dx('heading-compact-01')}>{title}</h1>}
          {description && (
            <span className={dx('label-01', 'text-muted-foreground')}>
              {description}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Suspense>
          <ChangeLanguage />
        </Suspense>
        <Suspense>
          <ChangeTheme />
        </Suspense>
        <Suspense>
          <Notification />
        </Suspense>
      </div>
    </header>
  )
}
