import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { HEADER_HEIGHT, SIDE_COLLAPSED_W } from '@/shared/constants/layout'
import { useSidebar } from '@/shared/stores/sidebar'
import { LayoutPanelLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function SidebarHeader() {
  const { t } = useTranslation()
  const { isOpen, toggle } = useSidebar()
  return (
    <div
      className={cn(
        'group flex shrink-0 items-center justify-between gap-2 rounded-br-2xl bg-primary p-2 text-primary-foreground',
        !isOpen && 'justify-center rounded-br-md'
      )}
      style={{ height: isOpen ? HEADER_HEIGHT : SIDE_COLLAPSED_W }}
    >
      {isOpen ? (
        <img
          src="/deskel-logo.svg"
          alt="AI Consultant DESKEL"
          className="h-full grow fill-foreground object-contain object-left"
        />
      ) : (
        <img
          src="/favicon.svg"
          alt="AI Consultant DESKEL"
          className="h-full grow object-contain object-left"
        />
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggle}
            className={cn(
              'flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring group-hover:bg-background group-hover:text-foreground',
              !isOpen && 'absolute opacity-0 group-hover:opacity-100'
            )}
          >
            <LayoutPanelLeftIcon size={15} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          {t('action.toggle-sidebar')}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
