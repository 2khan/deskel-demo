import BlurBackground from '@/components/custom/BlurBackground'
import Logo from '@/components/custom/Logo'
import { HEADER_HEIGHT } from '@/shared/constants/layout'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function SidebarHeader() {
  return (
    <Link to="/" className="shrink-0">
      <AnimatePresence initial={true}>
        <BlurBackground
          sides={['top-right', 'bottom-left']}
          className="flex flex-col items-center rounded-2xl border border-background py-2 text-primary dark:text-foreground"
          style={{ height: HEADER_HEIGHT }}
        >
          <Logo />
        </BlurBackground>
      </AnimatePresence>
    </Link>
  )
}
