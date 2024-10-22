import { DataTable } from '@/components/custom/DataTable'

import type { ColumnDef } from '@tanstack/react-table'
import data from './output.json'
import { ChatBubbleIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
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
import { Button } from '@/components/ui/button'
import {
  DownloadIcon,
  EllipsisVerticalIcon,
  FullscreenIcon,
  XIcon
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import TooltipButton from '@/components/custom/TooltipButton'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import PPT from '@/demo/common/components/ppt'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

export default function ReportHistory() {
  const { t } = useTranslation('demo')
  const { t: commonTranslation } = useTranslation('common')
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
    },
    {
      header: commonTranslation('token.action'),
      minSize: 100,
      meta: {
        label: commonTranslation('token.action')
      },
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <TooltipButton
              helper={commonTranslation('action.chat')}
              size="icon"
              variant="outline"
              className="text-primary"
            >
              <ChatBubbleIcon />
            </TooltipButton>
            <Dialog>
              <DialogTrigger asChild>
                <TooltipButton
                  helper={commonTranslation('action.view-file')}
                  size="icon"
                  variant="outline"
                  className="text-primary"
                >
                  <FullscreenIcon size={15} />
                </TooltipButton>
              </DialogTrigger>
              <PPT
                title={row.original.organization_name}
                description={`${format(row.original.start_date, 'yyyy/MM/dd')} - ${format(row.original.end_date, 'yyyy/MM/dd')}`}
              />
            </Dialog>
            <TooltipButton
              helper={commonTranslation('action.download-file')}
              size="icon"
              variant="outline"
              className="text-primary"
            >
              <DownloadIcon size={15} />
            </TooltipButton>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <EllipsisVerticalIcon size={15} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex w-full justify-between">
                    {commonTranslation('token.action')} 1
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex w-full justify-between">
                    {commonTranslation('token.action')} 2
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="flex w-full justify-between bg-destructive text-destructive-foreground">
                      {commonTranslation('action.cancel')}
                      <XIcon size={15} />
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {commonTranslation('confirm.sure', {
                      action: commonTranslation('action.cancel')
                    })}
                  </DialogTitle>
                  <DialogDescription>
                    {commonTranslation('warn.irreversible')}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">
                      {commonTranslation('action.hide')}
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="destructive">
                      {commonTranslation('action.cancel')}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )
      }
    }
  ]
  return (
    <Tabs value="media-insight">
      <TabsList>
        <TabsTrigger value="media-insight">
          {commonTranslation('glossary.media-insight')}
        </TabsTrigger>
        <TabsTrigger value="sns">
          {commonTranslation('glossary.SNS')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="media-insight">
        <DataTable columns={columns} data={data as TRow[]} showFooter />
      </TabsContent>
    </Tabs>
  )
}
