import { Fragment } from 'react/jsx-runtime'
import { useTranslation } from 'react-i18next'
import { m } from 'framer-motion'
import { NavLink } from 'react-router-dom'

// COMPONENTS
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

// UTILS
import { cn } from '@/lib/utils'
import { dx } from '@/shared/design-system/typography'
import ListRoutes from '@/routes/list'
import DetailRoutes from '@/routes/detail'
import { useSidebar } from '@/shared/stores/sidebar'
import { SIDE_COLLAPSED_ITEM_W } from '@/shared/constants/layout'
import type { ParseKeys } from 'i18next'
import type { TRouteObject } from '@/shared/types/utils/route'

type TListItem = {
  title: ParseKeys<'common'>
  routes: TRouteObject[]
}

const lists = [
  {
    title: 'glossary.analyses',
    routes: DetailRoutes
  },
  {
    title: 'glossary.report-history',
    routes: ListRoutes
  }
] as const satisfies TListItem[]

export default function SideNav() {
  const { isOpen } = useSidebar()
  const { t } = useTranslation()

  return (
    <nav
      className={cn(
        'flex w-full grow flex-col gap-2 py-2 pl-2',
        isOpen && 'gap-4'
      )}
    >
      {lists.map((list, i) => (
        <Fragment key={list.title}>
          <div className="flex w-full flex-col gap-1.5">
            <m.span
              className={dx(
                'heading-compact-01',
                'block w-max shrink-0 text-muted-foreground',
                !isOpen && 'sr-only'
              )}
              animate={
                isOpen
                  ? { opacity: 1, transition: { delay: 0.1 } }
                  : { opacity: 0 }
              }
            >
              {t(list.title)}
            </m.span>
            <ul className="flex w-full flex-col">
              {list.routes.map((r) => (
                <li key={r.path} className="group w-full">
                  <Tooltip open={isOpen ? false : undefined}>
                    <TooltipTrigger className="w-full">
                      <NavLink
                        end
                        to={r.path}
                        className={({ isActive }) =>
                          dx(
                            'body-compact-01',
                            'flex w-full items-center gap-2 p-2 font-medium text-muted-foreground group-hover:text-primary',
                            isActive &&
                              'rounded-md bg-background text-foreground shadow',
                            !isOpen && 'justify-center'
                          )
                        }
                        style={{
                          height: isOpen ? 'max-content' : SIDE_COLLAPSED_ITEM_W
                        }}
                      >
                        <m.div
                          animate={isOpen ? { scale: 0.75 } : { scale: 1 }}
                        >
                          <r.icon size={20} className="shrink-0" />
                        </m.div>
                        <m.span
                          className={cn(
                            'block w-max shrink-0',
                            !isOpen && 'sr-only'
                          )}
                          animate={
                            isOpen
                              ? { opacity: 1, transition: { delay: 0.1 } }
                              : { opacity: 0 }
                          }
                        >
                          {t(r.label)}
                        </m.span>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">{t(r.label)}</TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
          {i !== lists.length - 1 && <Separator />}
        </Fragment>
      ))}
    </nav>
  )
}
