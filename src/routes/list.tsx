import type { TRouteObject } from '@/shared/types/utils/route'
import { TableIcon } from '@radix-ui/react-icons'
// import {
//   NewspaperIcon,
//   SubtitlesIcon,
//   LineChartIcon,
//   LayoutDashboardIcon
// } from 'lucide-react'

const ListRoutes = [
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
  // {
  //   label: 'glossary.SNS',
  //   icon: SubtitlesIcon,
  //   path: '/sns',
  //   lazy: async () => {
  //     const { default: Component } = await import('@/pages/sns/list')
  //     return {
  //       Component
  //     }
  //   }
  // },
  // {
  //   label: 'glossary.IR',
  //   icon: LineChartIcon,
  //   path: '/ir',
  //   lazy: async () => {
  //     const { default: Component } = await import('@/pages/ir/list')
  //     return {
  //       Component
  //     }
  //   }
  // },
  // {
  //   label: 'glossary.multi-step',
  //   icon: LayoutDashboardIcon,
  //   path: '/multi-step',
  //   lazy: async () => {
  //     const { default: Component } = await import('@/pages/multi-step/list')
  //     return {
  //       Component
  //     }
  //   }
  // }
] as const satisfies TRouteObject[]

export default ListRoutes
