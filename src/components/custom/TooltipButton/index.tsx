import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button, ButtonProps } from '@/components/ui/button'
import { ForwardedRef, forwardRef } from 'react'

type TooptipButtonProps = ButtonProps & {
  helper: React.ReactNode
  delayDuration?: number
}

const TooltipButton = forwardRef(
  (props: TooptipButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { helper, delayDuration = 200, ...rest } = props
    return (
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <Button {...rest} ref={ref} />
        </TooltipTrigger>
        <TooltipContent>
          <span>{helper}</span>
        </TooltipContent>
      </Tooltip>
    )
  }
)

TooltipButton.displayName = 'TooltipButton'

export default TooltipButton
