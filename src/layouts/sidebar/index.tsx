import { lazy, Suspense } from 'react'
import { LayoutPanelLeftIcon } from 'lucide-react'

// COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

// UTILS
import { useSidebar } from '@/shared/stores/sidebar'
import { cn } from '@/lib/utils'
import {
  SIDE_OPEN_W,
  SIDE_COLLAPSED_W,
  HEADER_HEIGHT
} from '@/shared/constants/layout'
import { useTranslation } from 'react-i18next'

const SideNav = lazy(() => import('../side-nav'))
const UserMenu = lazy(() => import('../user-menu'))
const ChangeLanguage = lazy(() => import('@/components/custom/ChangeLanguage'))
const ChangeTheme = lazy(() => import('@/components/custom/ChangeTheme'))

export default function Sidebar() {
  const { t } = useTranslation()
  const { isOpen, toggle } = useSidebar()

  return (
    <aside
      className={cn('hidden w-full grow flex-col duration-200 sm:flex')}
      style={{ maxWidth: isOpen ? SIDE_OPEN_W : SIDE_COLLAPSED_W }}
    >
      <div className="group relative flex">
        <div
          className={cn(
            'flex grow items-center justify-between gap-2 rounded-br-2xl bg-primary p-2 text-primary-foreground',
            !isOpen && 'justify-center rounded-br-md'
          )}
          style={{ height: isOpen ? HEADER_HEIGHT : SIDE_COLLAPSED_W }}
        >
          {isOpen ? (
            <img
              src="/deskel-logo.svg"
              alt="AI Consultant DESKEL"
              className="h-full grow fill-foreground object-contain object-left"
            />
          ) : (
            <img
              src="/favicon.svg"
              alt="AI Consultant DESKEL"
              className="h-full grow object-contain object-left"
            />
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggle}
                className={cn(
                  'flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring group-hover:bg-background group-hover:text-foreground',
                  !isOpen && 'absolute opacity-0 group-hover:opacity-100'
                )}
              >
                <LayoutPanelLeftIcon size={15} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {t('action.toggle-sidebar')}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <Suspense>
        <SideNav />
      </Suspense>
      <div className={cn('flex items-center gap-1 p-2', !isOpen && 'flex-col')}>
        <Suspense>
          <ChangeLanguage />
        </Suspense>
        <Suspense>
          <ChangeTheme />
        </Suspense>
      </div>
      <Suspense>
        <UserMenu />
      </Suspense>
    </aside>
  )
}
