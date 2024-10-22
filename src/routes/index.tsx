import type { RouteObject } from 'react-router-dom'
import App from '@/App'
import Layout from '@/layouts'
import MainRoutes from './main'

const Routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            children: MainRoutes
          },
          {
            path: '/chat/:id',
            lazy: async () => {
              const { default: Component } = await import('@/pages/chat')
              return {
                Component
              }
            }
          }
        ]
      },
      {
        path: '*',
        lazy: async () => {
          const { default: Component } = await import('@/pages/404')
          return {
            Component
          }
        }
      }
    ]
  }
]

export default Routes
