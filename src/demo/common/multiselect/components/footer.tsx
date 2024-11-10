import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-end gap-2 border-t p-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">{t('token.count')}</p>
        <Select value="10">
          <SelectTrigger className="h-8" style={{ width: 64 }}>
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent side="top" align="end">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-max items-center justify-center gap-1 text-sm font-medium">
        {t('token.page')}: 1
      </div>
      <Input
        className="w-full p-2 text-center"
        style={{ maxWidth: 72 }}
        placeholder="#"
      />
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" disabled={true}>
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" disabled={true}>
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
