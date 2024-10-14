import { CONTENT_PADDING, HEADER_HEIGHT } from '@/shared/constants/layout'
import { dx } from '@/shared/design-system/typography'

type TProps = {
  title: string
}

export default function StatusBar(props: TProps) {
  const { title } = props
  return (
    <header
      className="col-span-12 flex items-center justify-between border-b px-6 py-4"
      style={{ height: HEADER_HEIGHT - CONTENT_PADDING }}
    >
      <h1 className={dx('heading-02')}>{title}</h1>
    </header>
  )
}
