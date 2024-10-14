import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './shared/contexts/ThemeProvider'
import { LazyMotion } from 'framer-motion'

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
