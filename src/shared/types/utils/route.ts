import type { ParseKeys } from 'i18next'
import type { RouteObject } from 'react-router-dom'
import type { TIcon } from './icon'

// TYPE FOR ICON AND LABEL + NATIVE ROUTE OBJECT TYPE
export type TRouteObject = Omit<RouteObject, 'path'> & {
  // LABELS FROM i18n
  label: ParseKeys<'common'>
  path: string
  icon?: TIcon
}
