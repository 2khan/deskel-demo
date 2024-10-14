import { DataTable } from '@/components/custom/DataTable'

import type { ColumnDef } from '@tanstack/react-table'
import data from './output.json'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { Progress } from '@/components/ui/progress'
import StatusChip from './components/statusChip'
import { useTranslation } from 'react-i18next'
import { dx } from '@/shared/design-system/typography'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import OrganizationNameFilter from './filters/organization-name'
import StartDateFilter from './filters/start-date'
import { dateRangeFilterFn } from './filters/date-range-filterFn'
import EndDateFilter from './filters/end-date'
import StatusFilter from './filters/status'

export type TRow = {
  id: string
  organization_name: string
  homepages: string[]
  start_date: string
  end_date: string
} & (
  | {
      status: 'draft' | 'error' | 'completed' | 'cancelled'
    }
  | {
      status: 'in_progress'
      progress: number
    }
)

export default function MediaTable() {
  const { t } = useTranslation('demo')
  const columns: ColumnDef<TRow>[] = [
    {
      accessorKey: 'organization_name',
      header: t('media-insight.columns.organization-name'),
      meta: {
        label: t('media-insight.columns.organization-name'),
        filterComponent: OrganizationNameFilter
      },
      minSize: 200
    },
    {
      accessorKey: 'homepages',
      header: t('media-insight.columns.homepages'),
      meta: {
        label: t('media-insight.columns.homepages')
      },
      minSize: 200,
      cell: ({ cell }) => {
        const homepages = cell.getValue<TRow['homepages']>()
        return (
          <div className="flex flex-col">
            {homepages.map((page) => (
              <div key={page} className="flex items-center gap-1">
                <Link
                  to="/media-insight"
                  className={dx('label-01', 'underline underline-offset-2')}
                >
                  {page}
                </Link>
                <ExternalLinkIcon />
              </div>
            ))}
          </div>
        )
      }
    },
    {
      accessorKey: 'start_date',
      header: t('media-insight.columns.start-date'),
      meta: {
        label: t('media-insight.columns.start-date'),
        filterComponent: StartDateFilter
      },
      filterFn: dateRangeFilterFn,
      minSize: 150,
      cell: ({ cell }) => {
        const date = cell.getValue<TRow['start_date']>()
        return date ? format(date, 'yyyy/MM/dd') : '-'
      }
    },
    {
      accessorKey: 'end_date',
      header: t('media-insight.columns.end-date'),
      meta: {
        label: t('media-insight.columns.end-date'),
        filterComponent: EndDateFilter
      },
      filterFn: dateRangeFilterFn,
      minSize: 150,
      cell: ({ cell }) => {
        const date = cell.getValue<TRow['end_date']>()
        return date ? format(date, 'yyyy/MM/dd') : '-'
      }
    },
    {
      accessorKey: 'status',
      header: t('media-insight.columns.status'),
      meta: {
        label: t('media-insight.columns.status'),
        align: 'center',
        filterComponent: StatusFilter
      },
      minSize: 100,
      cell: ({ cell }) => {
        const status = cell.getValue<TRow['status']>()
        return (
          <div className="flex max-w-32 flex-col items-center">
            {status === 'in_progress' ? (
              <Progress />
            ) : (
              <StatusChip status={status} />
            )}
          </div>
        )
      }
    }
  ]
  return <DataTable columns={columns} data={data as TRow[]} showFooter />
}
