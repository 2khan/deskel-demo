import type { TRouteObject } from '@/shared/types/utils/route'
// import {
//   NewspaperIcon,
//   SubtitlesIcon,
//   LineChartIcon,
//   LayoutDashboardIcon
// } from 'lucide-react'

const ListRoutes = [
  // {
  //   label: 'glossary.media-insight',
  //   icon: NewspaperIcon,
  //   path: '/media-insight',
  //   lazy: async () => {
  //     const { default: Component } = await import('@/pages/media-insight/list')
  //     return {
  //       Component
  //     }
  //   }
  // },
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
