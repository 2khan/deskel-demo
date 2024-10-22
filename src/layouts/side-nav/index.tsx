import { Fragment } from 'react/jsx-runtime'
import { useTranslation } from 'react-i18next'

// COMPONENTS
import { Separator } from '@/components/ui/separator'

// UTILS
import { dx } from '@/shared/design-system/typography'
import MainRoutes from '@/routes/main'
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
  const { t } = useTranslation()

  return (
    <nav className="flex w-full grow flex-col gap-1.5 px-px">
      {lists.map((list) => (
        <Fragment key={list.title}>
          <span
            className={dx(
              'label-01',
              'line-clamp-1 font-bold text-muted-foreground'
            )}
          >
            {t(list.title)}
          </span>
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
        </Fragment>
      ))}

      <Separator />

      <ThreadsMenu />
    </nav>
  )
}
