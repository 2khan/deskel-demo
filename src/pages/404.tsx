import BlurBackground from '@/components/custom/BlurBackground'
import Logo from '@/components/custom/Logo'
import { Button } from '@/components/ui/button'
import {
  CONTENT_PADDING,
  HEADER_HEIGHT,
  SIDE_OPEN_W
} from '@/shared/constants/layout'
import { dx } from '@/shared/design-system/typography'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <BlurBackground
      sides={['top-right', 'bottom-left']}
      className="flex h-full w-full grow flex-col p-2"
      size={128}
    >
      <Link
        to="/"
        className="w-max rounded-2xl border bg-card py-2 text-card-foreground"
        style={{ height: HEADER_HEIGHT, width: SIDE_OPEN_W - CONTENT_PADDING }}
      >
        <Logo />
      </Link>
      <div className="flex grow flex-col items-center justify-center gap-3">
        <span className={dx('fluid-paragraph-01')}>Page not found</span>
        <div className="via-gradient-2 bg-gradient-to-r from-gradient-1 to-gradient-3 bg-clip-text dark:brightness-150">
          <span className={dx('fluid-display-04', 'text-transparent')}>
            404
          </span>
        </div>
        <Button asChild variant="link">
          <Link to="/">Go to home</Link>
        </Button>
      </div>
    </BlurBackground>
  )
}
