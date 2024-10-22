import { useTranslation } from 'react-i18next'
import { useEffect, lazy, Suspense, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

// UTILS
import MainRoutes from '@/routes/main'
import { CONTENT_PADDING } from '@/shared/constants/layout'
import { find } from 'lodash'
import { useStatusbar } from '@/shared/stores/statusbar'

// COMPONENTS
const Sidebar = lazy(() => import('./sidebar'))
const StatusBar = lazy(() => import('./statusbar'))

export default function Layout() {
  const { t } = useTranslation()
  const location = useLocation()
  const { title, setTitle } = useStatusbar()

  const currentRoute = useMemo(
    () => find(MainRoutes, (r) => r.path == location.pathname),
    [location.pathname]
  )

  useEffect(() => {
    setTitle(t(currentRoute?.label || 'glossary.dashboard'))
  }, [t, currentRoute, setTitle])

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_TITLE} | ${title}`
  }, [t, title])

  return (
    <div className="flex w-full grow">
      <Suspense>
        <Sidebar />
      </Suspense>
      <div
        className="flex h-screen grow flex-col sm:pl-0"
        style={{ padding: CONTENT_PADDING }}
      >
        <main className="flex grow flex-col overflow-hidden rounded-2xl bg-background">
          <Suspense>
            <StatusBar />
          </Suspense>
          <div className="w-full grow overflow-y-auto px-3 py-2 xl:px-6 xl:py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
