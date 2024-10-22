import BlurBackground from '@/components/custom/BlurBackground'
import Logo from '@/components/custom/Logo'
import { HEADER_HEIGHT } from '@/shared/constants/layout'

export default function SidebarHeader() {
  return (
    <BlurBackground
      className="group flex shrink-0 flex-col items-start rounded-2xl p-2.5"
      style={{ height: HEADER_HEIGHT }}
    >
      <Logo className="text-primary" />
    </BlurBackground>
  )
}
