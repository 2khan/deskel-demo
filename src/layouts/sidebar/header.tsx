import { HEADER_HEIGHT } from '@/shared/constants/layout'

export default function SidebarHeader() {
  return (
    <div
      className="group flex shrink-0 items-center justify-between gap-2 rounded-br-2xl bg-primary p-2 text-primary-foreground"
      style={{ height: HEADER_HEIGHT }}
    >
      <img
        src="/deskel-logo.svg"
        alt="AI Consultant DESKEL"
        className="h-full grow fill-foreground object-contain object-left"
      />
    </div>
  )
}
