import { lazy, Suspense } from 'react'

// UTILS
import { useSidebar } from '@/shared/stores/sidebar'
import { cn } from '@/lib/utils'
import {
  SIDE_OPEN_W,
  SIDE_COLLAPSED_W,
  SCROLLBAR_PADDING
} from '@/shared/constants/layout'
import { ScrollArea } from '@/components/ui/scroll-area'

const SidebarHeader = lazy(() => import('./header'))
const SideNav = lazy(() => import('../side-nav'))
const UserMenu = lazy(() => import('./footer'))

export default function Sidebar() {
  const { isOpen } = useSidebar()

  return (
    <aside
      className={cn(
        'relative hidden h-screen w-full grow flex-col overflow-hidden duration-200 sm:flex'
      )}
      style={{
        maxWidth: isOpen ? SIDE_OPEN_W : SIDE_COLLAPSED_W
      }}
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
    </aside>
  )
}
