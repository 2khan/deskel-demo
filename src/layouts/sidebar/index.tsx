import { lazy, Suspense } from 'react'

// UTILS
import { useSidebar } from '@/shared/stores/sidebar'
import { cn } from '@/lib/utils'
import { SIDE_OPEN_W, SCROLLBAR_PADDING } from '@/shared/constants/layout'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AnimatePresence, m } from 'framer-motion'

const SidebarHeader = lazy(() => import('./header'))
const SideNav = lazy(() => import('../side-nav'))
const UserMenu = lazy(() => import('./footer'))

export default function Sidebar() {
  const { isOpen } = useSidebar()

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <m.aside
          key="sidebar"
          className={cn(
            'relative flex h-screen w-full shrink-0 grow flex-col gap-2 py-2 pl-2'
          )}
          initial={{ maxWidth: 0 }}
          animate={{
            maxWidth: SIDE_OPEN_W
          }}
          exit={{
            maxWidth: 0
          }}
          transition={{ duration: 0.15 }}
        >
          <Suspense>
            <SidebarHeader />
          </Suspense>
          <ScrollArea
            className="w-full grow"
            style={{ paddingRight: SCROLLBAR_PADDING }}
          >
            <Suspense>
              <SideNav />
            </Suspense>
          </ScrollArea>

          <Suspense>
            <UserMenu />
          </Suspense>
        </m.aside>
      )}
    </AnimatePresence>
  )
}
