import { lazy, Suspense, useEffect, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ThemeProvider } from './shared/contexts/ThemeProvider'
import { LazyMotion } from 'framer-motion'
import { useStatusbar } from './shared/stores/statusbar'
import { find } from 'lodash'
import MainRoutes from './routes/main'
import { useTranslation } from 'react-i18next'

const loadFeatures = () =>
  import('@/shared/design-system/motion-features').then((m) => m.default)

const TooltipProvider = lazy(() =>
  import('@/components/ui/tooltip').then(({ TooltipProvider }) => ({
    default: TooltipProvider
  }))
)

const Toaster = lazy(() =>
  import('@/components/ui/sonner').then(({ Toaster }) => ({ default: Toaster }))
)

export default function App() {
  const { t } = useTranslation()
  const { title, setTitle } = useStatusbar()
  const location = useLocation()

  const currentRoute = useMemo(
    () => find(MainRoutes, (r) => r.path == location.pathname),
    [location.pathname]
  )

  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_TITLE} | ${title}`
  }, [t, title])

  useEffect(() => {
    setTitle({
      title: t(currentRoute?.label || 'glossary.dashboard')
    })
  }, [t, currentRoute, setTitle])

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Suspense>
        <TooltipProvider delayDuration={300}>
          <LazyMotion features={loadFeatures}>
            <Outlet />
          </LazyMotion>
        </TooltipProvider>
      </Suspense>
      <Suspense>
        <Toaster />
      </Suspense>
    </ThemeProvider>
  )
}
