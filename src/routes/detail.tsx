import type { TRouteObject } from '@/shared/types/utils/route'
import {
  NewspaperIcon,
  SubtitlesIcon,
  LineChartIcon,
  LayoutDashboardIcon
} from 'lucide-react'

const DetailRoutes = [
  {
    label: 'glossary.media-insight',
    icon: NewspaperIcon,
    path: '/media-insight/:id',
    lazy: async () => {
      const { default: Component } = await import(
        '@/pages/media-insight/detail'
      )
      return {
        Component
      }
    }
  },
  {
    label: 'glossary.SNS',
    icon: SubtitlesIcon,
    path: '/sns/:id',
    lazy: async () => {
      const { default: Component } = await import('@/pages/sns/detail')
      return {
        Component
      }
    }
  },
  {
    label: 'glossary.IR',
    icon: LineChartIcon,
    path: '/ir/:id',
    lazy: async () => {
      const { default: Component } = await import('@/pages/ir/detail')
      return {
        Component
      }
    }
  },
  {
    label: 'glossary.multi-step',
    icon: LayoutDashboardIcon,
    path: '/multi-step/:id',
    lazy: async () => {
      const { default: Component } = await import('@/pages/multi-step/detail')
      return {
        Component
      }
    }
  }
] as const satisfies TRouteObject[]

export default DetailRoutes
