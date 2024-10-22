import BlurBackground from '@/components/custom/BlurBackground'
import Logo from '@/components/custom/Logo'
import { HEADER_HEIGHT } from '@/shared/constants/layout'
import { Link } from 'react-router-dom'

export default function SidebarHeader() {
  return (
    <Link to="/" className="shrink-0">
      <BlurBackground
        className="group flex flex-col items-start rounded-2xl p-2.5"
        style={{ height: HEADER_HEIGHT }}
      >
        <Logo className="text-primary" />
      </BlurBackground>
    </Link>
  )
}
