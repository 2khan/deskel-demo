import { cn } from '@/lib/utils'
import { HEADER_HEIGHT, SIDE_COLLAPSED_W } from '@/shared/constants/layout'
import { useSidebar } from '@/shared/stores/sidebar'

export default function SidebarHeader() {
  const { isOpen } = useSidebar()
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
    </div>
  )
}
