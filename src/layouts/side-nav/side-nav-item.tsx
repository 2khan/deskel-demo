import { cn } from '@/lib/utils'
import { dx } from '@/shared/design-system/typography'
import { Tooltip, TooltipTrigger } from '@radix-ui/react-tooltip'
import { NavLink } from 'react-router-dom'
import { m } from 'framer-motion'
import { SIDE_COLLAPSED_ITEM_W } from '@/shared/constants/layout'
import { TooltipContent } from '@/components/ui/tooltip'
import { useSidebar } from '@/shared/stores/sidebar'
import type { TRouteObject } from '@/shared/types/utils/route'
import { useTranslation } from 'react-i18next'

type TProps = {
  routeData: TRouteObject
}

export default function SideNavItem(props: TProps) {
  const { t } = useTranslation()
  const { routeData } = props
  const { isOpen } = useSidebar()
  return (
    <Tooltip open={isOpen ? false : undefined}>
      <TooltipTrigger className="w-full">
        <NavLink
          end
          to={routeData.path}
          className={({ isActive }) =>
            dx(
              'body-compact-01',
              'flex w-full items-center gap-2 p-2 font-medium text-muted-foreground group-hover:text-primary',
              isActive && 'rounded-md bg-background text-foreground shadow',
              !isOpen && 'justify-center'
            )
          }
          style={{
            height: isOpen ? 'max-content' : SIDE_COLLAPSED_ITEM_W
          }}
        >
          {routeData.icon && (
            <m.div
              animate={isOpen ? { scale: 0.75 } : { scale: 1 }}
              className="shrink-0"
            >
              <routeData.icon size={20} />
            </m.div>
          )}
          <m.div
            className={cn('truncate', !isOpen && 'sr-only')}
            animate={
              isOpen
                ? {
                    opacity: 1,
                    transition: {
                      delay: 0.1
                    }
                  }
                : { opacity: 0 }
            }
          >
            {t(routeData.label)}
          </m.div>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">{t(routeData.label)}</TooltipContent>
    </Tooltip>
  )
}
