import { useEffect, lazy, Suspense, useMemo } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'

// UTILS
import ListRoutes from '@/routes/list'
import DetailRoutes from '@/routes/detail'
import { CONTENT_PADDING } from '@/shared/constants/layout'
import { find, flatten, has } from 'lodash'
import type { TRouteObject } from '@/shared/types/utils/route'
import { useTranslation } from 'react-i18next'

// COMPONENTS
const Sidebar = lazy(() => import('./sidebar'))
const StatusBar = lazy(() => import('./statusbar'))

const routes = flatten<TRouteObject>([ListRoutes, DetailRoutes])

export default function Layout() {
  const { t } = useTranslation()
  const params = useParams()
  const location = useLocation()

  const id = has(params, 'id') ? params['id'] : null

  const currentRoute = find(routes, (r) => r.path == location.pathname)

  const title = useMemo(() => {
    return [t(`${currentRoute?.label || 'glossary.dashboard'}`), id]
      .filter(Boolean)
      .join(': ')
  }, [t, currentRoute, id])

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_TITLE} | ${title}`
  }, [title])

  return (
    <div className="flex w-full grow gap-2">
      <Suspense>
        <Sidebar />
      </Suspense>
      <div
        className="flex h-screen max-w-screen-3xl grow flex-col sm:pl-0"
        style={{ paddingBlock: CONTENT_PADDING, paddingRight: CONTENT_PADDING }}
      >
        <main className="flex grow flex-col overflow-hidden rounded-2xl bg-background">
          <Suspense>
            <StatusBar title={title} />
          </Suspense>
          <div className="w-full grow overflow-y-auto px-3 py-2 xl:px-6 xl:py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
