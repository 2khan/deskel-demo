import type { TRouteObject } from '@/shared/types/utils/route'
import { PlusIcon, TableIcon } from 'lucide-react'

const MainRoutes = [
  {
    label: 'glossary.new-analysis',
    icon: PlusIcon,
    path: '/',
    lazy: async () => {
      const { default: Component } = await import('@/pages/new-chat')
      return {
        Component
      }
    }
  },
  {
    label: 'glossary.report-history',
    icon: TableIcon,
    path: '/report-history',
    lazy: async () => {
      const { default: Component } = await import('@/pages/report-history')
      return {
        Component
      }
    }
  }
] as const satisfies TRouteObject[]

export default MainRoutes
