import { cn } from '@/lib/utils'
import { dx } from '@/shared/design-system/typography'
import { Tooltip, TooltipTrigger } from '@radix-ui/react-tooltip'
import { NavLink } from 'react-router-dom'
import { m } from 'framer-motion'
import { SIDE_COLLAPSED_ITEM_W } from '@/shared/constants/layout'
import { TooltipContent } from '@/components/ui/tooltip'
import { useSidebar } from '@/shared/stores/sidebar'

type TProps = {
  path: string
  label: string
  symbol?: React.ReactNode
}

export default function SideNavItem(props: TProps) {
  const { label, path, symbol } = props
  const { isOpen } = useSidebar()
  return (
    <Tooltip open={isOpen ? false : undefined}>
      <TooltipTrigger className="w-full">
        <NavLink
          end
          to={path}
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
          {symbol && (
            <m.div
              animate={isOpen ? { scale: 0.75 } : { scale: 1 }}
              className="shrink-0"
            >
              {symbol}
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
            {label}
          </m.div>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}
