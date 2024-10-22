import { dx } from '@/shared/design-system/typography'
import data from './output.json'
// import { useTranslation } from 'react-i18next'
import SideNavItem from '@/layouts/side-nav/side-nav-item'
import { isWithinInterval, parse, sub } from 'date-fns'
import { Fragment } from 'react/jsx-runtime'

export default function ThreadsMenu() {
  // const { t } = useTranslation()

  const now = parse('2024/10/22', 'yyyy/MM/dd', new Date())

  const yesterdayData = data.filter((item) =>
    isWithinInterval(item.updated_date, {
      start: sub(now, {
        days: 1
      }),
      end: now
    })
  )

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
    <Fragment>
      <span className={dx('label-01', 'font-bold text-muted-foreground')}>
        Yesterday
      </span>
      <ul className="flex w-full flex-col">
        {yesterdayData.map((r) => (
          <li key={r.id} className="group w-full">
            <SideNavItem
              label={r.label}
              symbol={
                <div className="size-5">
                  <span className={dx('label-01', 'font-medium uppercase')}>
                    {r.label.substring(0, 2)}
                  </span>
                </div>
              }
              path={`/threads/${r.id}`}
            />
          </li>
        ))}
      </ul>
      <span className={dx('label-01', 'font-bold text-muted-foreground')}>
        Last Week
      </span>
      <ul className="flex w-full flex-col">
        {lastWeekData.map((r) => (
          <li key={r.id} className="group w-full">
            <SideNavItem
              label={r.label}
              symbol={
                <div className="size-5">
                  <span className={dx('label-01', 'font-medium uppercase')}>
                    {r.label.substring(0, 2)}
                  </span>
                </div>
              }
              path={`/threads/${r.id}`}
            />
          </li>
        ))}
      </ul>

      <span className={dx('label-01', 'font-bold text-muted-foreground')}>
        Last Month
      </span>
      <ul className="flex w-full flex-col">
        {lastMonthData.map((r) => (
          <li key={r.id} className="group w-full">
            <SideNavItem
              label={r.label}
              symbol={
                <div className="size-5">
                  <span className={dx('label-01', 'font-medium uppercase')}>
                    {r.label.substring(0, 2)}
                  </span>
                </div>
              }
              path={`/threads/${r.id}`}
            />
          </li>
        ))}
      </ul>
    </Fragment>
  )
}
