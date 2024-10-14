import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import type { IconProps } from '@/shared/types/utils/icon'

const Spinner = (props: IconProps) => {
  const { className, ...rest } = props
  return <LoaderIcon size={15} className={cn(className)} {...rest} />
}

export default Spinner
