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
            path: '/',
            lazy: async () => {
              const { default: Component } = await import('@/pages/Home')
              return {
                Component
              }
            }
          },
          {
            children: MainRoutes
          }
        ]
      }
    ]
  }
]

export default Routes
