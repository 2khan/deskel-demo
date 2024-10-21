import { useStatusbar } from '@/shared/stores/statusbar'

// UTILS
import { dx } from '@/shared/design-system/typography'
import { CONTENT_PADDING, HEADER_HEIGHT } from '@/shared/constants/layout'

// DEMO
import Notification from '@/demo/notification/notification'

export default function StatusBar() {
  const { title } = useStatusbar()

  return (
    <header
      className="col-span-12 flex items-center justify-between border-b px-6 py-4"
      style={{ height: HEADER_HEIGHT - CONTENT_PADDING }}
    >
      <h1 className={dx('heading-02')}>{title}</h1>

      <Notification />
    </header>
  )
}
