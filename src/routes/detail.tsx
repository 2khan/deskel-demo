import type { TRouteObject } from '@/shared/types/utils/route'
import {
  // NewspaperIcon,
  // SubtitlesIcon,
  // LineChartIcon,
  // LayoutDashboardIcon,
  MessageCirclePlusIcon
} from 'lucide-react'

const DetailRoutes = [
  {
    label: 'glossary.new-analysis',
    icon: MessageCirclePlusIcon,
    path: '/chat',
    lazy: async () => {
      const { default: Component } = await import('@/pages/new-chat')
      return {
        Component
      }
    }
  }
  // {
  //   label: 'glossary.new-sns',
  //   icon: SubtitlesIcon,
  //   path: '/sns/:id',
  //   lazy: async () => {
  //     const { default: Component } = await import('@/pages/sns/detail')
  //     return {
  //       Component
  //     }
  //   }
  // },
  // {
  //   label: 'glossary.new-ir',
  //   icon: LineChartIcon,
  //   path: '/ir/:id',
  //   lazy: async () => {
  //     const { default: Component } = await import('@/pages/ir/detail')
  //     return {
  //       Component
  //     }
  //   }
  // },
  // {
  //   label: 'glossary.multi-step',
  //   icon: LayoutDashboardIcon,
  //   path: '/multi-step/:id',
  //   lazy: async () => {
  //     const { default: Component } = await import('@/pages/multi-step/detail')
  //     return {
  //       Component
  //     }
  //   }
  // }
] as const satisfies TRouteObject[]

export default DetailRoutes
