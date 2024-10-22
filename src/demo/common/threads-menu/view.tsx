import { dx } from '@/shared/design-system/typography'
import data from './output.json'
// import { useTranslation } from 'react-i18next'
import SideNavItem from '@/layouts/side-nav/side-nav-item'
import { isWithinInterval, sub } from 'date-fns'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { now } from '../constants'

export default function ThreadsMenu() {
  // const { t } = useTranslation()
  const yesterday = sub(now, {
    days: 1
  })

  const week = sub(yesterday, {
    days: 6
  })

  const month = sub(week, {
    weeks: 4
  })

  const yesterdayData = data.filter((item) =>
    isWithinInterval(item.updated_date, {
      start: now,
      end: yesterday
    })
  )

  const lastWeekData = data.filter((item) =>
    isWithinInterval(item.updated_date, {
      start: yesterday,
      end: week
    })
  )

  const lastMonthData = data.filter((item) =>
    isWithinInterval(item.updated_date, {
      start: week,
      end: month
    })
  )

  return (
    <div className="flex flex-col gap-4">
      <Collapsible defaultOpen className="flex w-full flex-col gap-2">
        <CollapsibleTrigger className="flex w-full items-center justify-between text-muted-foreground">
          <span className={dx('label-01', 'line-clamp-1 font-bold')}>
            Yesterday
          </span>
          <CaretSortIcon />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="flex w-full flex-col">
            {yesterdayData.map((r) => (
              <li key={r.id} className="group w-full">
                <SideNavItem
                  label={r.label}
                  symbol={
                    <span
                      className="font-medium uppercase"
                      style={{ fontSize: 10 }}
                    >
                      {r.label.substring(0, 2)}
                    </span>
                  }
                  path={`/chat/${r.id}`}
                />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible defaultOpen className="flex w-full flex-col gap-2">
        <CollapsibleTrigger className="flex w-full items-center justify-between text-muted-foreground">
          <span
            className={dx(
              'label-01',
              'line-clamp-1 font-bold text-muted-foreground'
            )}
          >
            Last Week
          </span>
          <CaretSortIcon />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="flex w-full flex-col">
            {lastWeekData.map((r) => (
              <li key={r.id} className="group w-full">
                <SideNavItem
                  label={r.label}
                  symbol={
                    <span
                      className="font-medium uppercase"
                      style={{ fontSize: 10 }}
                    >
                      {r.label.substring(0, 2)}
                    </span>
                  }
                  path={`/chat/${r.id}`}
                />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen className="flex w-full flex-col gap-2">
        <CollapsibleTrigger className="flex w-full items-center justify-between text-muted-foreground">
          <span
            className={dx(
              'label-01',
              'line-clamp-1 font-bold text-muted-foreground'
            )}
          >
            Last Month
          </span>
          <CaretSortIcon />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="flex w-full flex-col">
            {lastMonthData.map((r) => (
              <li key={r.id} className="group w-full">
                <SideNavItem
                  label={r.label}
                  symbol={
                    <span
                      className="font-medium uppercase"
                      style={{ fontSize: 10 }}
                    >
                      {r.label.substring(0, 2)}
                    </span>
                  }
                  path={`/chat/${r.id}`}
                />
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
