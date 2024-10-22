import BlurBackground from '@/components/custom/BlurBackground'
import Logo from '@/components/custom/Logo'
import { Button } from '@/components/ui/button'
import { dx } from '@/shared/design-system/typography'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <BlurBackground className="flex h-full w-full grow flex-col p-3" size={128}>
      <Link
        to="/"
        className="max-w-40 rounded-2xl bg-card p-3 text-primary hover:text-foreground"
      >
        <Logo />
      </Link>
      <div className="flex grow flex-col items-center justify-center gap-3">
        <span className={dx('fluid-paragraph-01')}>Page not found</span>
        <span className={dx('fluid-display-04')}>404</span>
        <Button asChild>
          <Link to="/">Go to home</Link>
        </Button>
      </div>
    </BlurBackground>
  )
}
