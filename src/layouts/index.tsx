import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

// UTILS
import { CONTENT_PADDING } from '@/shared/constants/layout'

// COMPONENTS
const Sidebar = lazy(() => import('./sidebar'))
const StatusBar = lazy(() => import('./statusbar'))

export default function Layout() {
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
