import { dx } from '@/shared/design-system/typography'
import { NavLink } from 'react-router-dom'

type TProps = {
  path: string
  label: string
  symbol?: React.ReactNode
}

export default function SideNavItem(props: TProps) {
  const { label, path, symbol } = props
  return (
    <NavLink
      end
      to={path}
      className={({ isActive }) =>
        dx(
          'body-compact-01',
          'flex w-full items-center gap-2 p-2 font-medium text-muted-foreground group-hover:text-primary',
          isActive && 'rounded-md bg-background text-foreground shadow'
        )
      }
    >
      {symbol && <div className="shrink-0">{symbol}</div>}
      <div className="truncate">{label}</div>
    </NavLink>
  )
}
