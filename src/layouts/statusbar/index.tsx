import { useStatusbar } from '@/shared/stores/statusbar'

// UTILS
import { dx } from '@/shared/design-system/typography'
import { CONTENT_PADDING, HEADER_HEIGHT } from '@/shared/constants/layout'

// DEMO
import { lazy, Suspense } from 'react'

const Notification = lazy(() => import('@/demo/notification/notification'))
const ChangeLanguage = lazy(() => import('@/components/custom/ChangeLanguage'))
const ChangeTheme = lazy(() => import('@/components/custom/ChangeTheme'))

export default function StatusBar() {
  const { title } = useStatusbar()

  return (
    <header
      className="col-span-12 flex items-center justify-between border-b px-6 py-4"
      style={{ height: HEADER_HEIGHT - CONTENT_PADDING }}
    >
      <h1 className={dx('heading-02')}>{title}</h1>

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
