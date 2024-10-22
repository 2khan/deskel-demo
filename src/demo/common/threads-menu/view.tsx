import { dx } from '@/shared/design-system/typography'
import { useSidebar } from '@/shared/stores/sidebar'
import { m } from 'framer-motion'
import data from './output.json'
// import { useTranslation } from 'react-i18next'
import SideNavItem from '@/layouts/side-nav/side-nav-item'
import { MessageCircleMoreIcon } from 'lucide-react'
import { isWithinInterval, sub } from 'date-fns'

export default function ThreadsMenu() {
  // const { t } = useTranslation()
  const { isOpen } = useSidebar()

  const now = new Date()

  const lastWeekData = data.filter((item) =>
    isWithinInterval(item.updated_date, {
      start: sub(now, {
        weeks: 1
      }),
      end: now
    })
  )

  const lastMonthData = data.filter((item) =>
    isWithinInterval(item.updated_date, {
      start: sub(now, {
        months: 1
      }),
      end: sub(now, {
        weeks: 1
      })
    })
  )

  return (
    <div className="flex w-full flex-col gap-1.5">
      <m.span
        className={dx(
          'heading-compact-01',
          'block w-max shrink-0 text-muted-foreground',
          !isOpen && 'sr-only'
        )}
        animate={
          isOpen ? { opacity: 1, transition: { delay: 0.1 } } : { opacity: 0 }
        }
      >
        Last Week
      </m.span>
      <ul className="flex w-full flex-col">
        {lastWeekData.map((r) => (
          <li key={r.id} className="group w-full">
            <SideNavItem
              label={r.label}
              icon={MessageCircleMoreIcon}
              path={`/threads/${r.id}`}
            />
          </li>
        ))}
      </ul>

      <m.span
        className={dx(
          'heading-compact-01',
          'block w-max shrink-0 text-muted-foreground',
          !isOpen && 'sr-only'
        )}
        animate={
          isOpen ? { opacity: 1, transition: { delay: 0.1 } } : { opacity: 0 }
        }
      >
        Last Month
      </m.span>
      <ul className="flex w-full flex-col">
        {lastMonthData.map((r) => (
          <li key={r.id} className="group w-full">
            <SideNavItem
              label={r.label}
              icon={MessageCircleMoreIcon}
              path={`/threads/${r.id}`}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
