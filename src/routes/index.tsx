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
          }
        ]
      }
    ]
  }
]

export default Routes
