import { Fragment } from 'react/jsx-runtime'
import { useTranslation } from 'react-i18next'
import { m } from 'framer-motion'

// COMPONENTS
import { Separator } from '@/components/ui/separator'

// UTILS
import { cn } from '@/lib/utils'
import { dx } from '@/shared/design-system/typography'
import MainRoutes from '@/routes/main'
import { useSidebar } from '@/shared/stores/sidebar'
import type { ParseKeys } from 'i18next'
import type { TRouteObject } from '@/shared/types/utils/route'
import SideNavItem from './side-nav-item'
import ThreadsMenu from '@/demo/common/threads-menu/view'

type TListItem = {
  title: ParseKeys<'common'>
  routes: TRouteObject[]
}

const lists = [
  {
    title: 'glossary.analyses',
    routes: MainRoutes
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
                  <SideNavItem
                    label={t(r.label)}
                    symbol={<r.icon size={20} />}
                    path={r.path}
                  />
                </li>
              ))}
            </ul>
          </div>
          {i !== lists.length - 1 && <Separator />}
        </Fragment>
      ))}

      <Separator />

      <ThreadsMenu />
    </nav>
  )
}
