import { cn } from '@/lib/utils'
import { m } from 'framer-motion'

type TSide = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

type TProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  size?: number
  sides?: TSide[]
}

const SideMap = {
  'top-left': {
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    rotate: 180
  },
  'top-right': {
    top: 0,
    left: 1,
    x: -1,
    y: 0,
    rotate: 0
  },
  'bottom-left': {
    top: 1,
    left: 0,
    x: 0,
    y: -1,
    rotate: 180
  },
  'bottom-right': {
    top: 1,
    left: 1,
    x: -1,
    y: -1,
    rotate: 0
  }
} satisfies Record<
  TSide,
  {
    top: number
    left: number
    x: number
    y: number
    rotate: number
  }
>

export default function BlurBackground(props: TProps) {
  const {
    className,
    children,
    size = 24,
    sides = ['top-left'],
    ...rest
  } = props

  const filterValue = size / 2

  return (
    <div className={cn('relative z-10 overflow-hidden', className)} {...rest}>
      {children}
      {sides.map((side) => {
        const { top, left, x, y, rotate } = SideMap[side]
        return (
          <m.div
            key={side}
            style={{
              top: `${top * 100}%`,
              left: `${left * 100}%`,
              x: `${y * 100}%`,
              y: `${y * 100}%`,
              rotate,
              filter: `blur(${filterValue}px)`
            }}
            initial={{ rotate }}
            animate={{
              x: [
                `${x * 100}%`,
                `${x == 0 ? 25 : -125}%`,
                `${x * 100}%`,
                `${x == 0 ? 25 : -125}%`,
                `${x * 100}%`
              ],
              y: [
                `${y * 100}%`,
                `${y == 0 ? 25 : -125}%`,
                `${y * 100}%`,
                `${y == 0 ? 25 : -125}%`,
                `${y * 100}%`
              ],
              rotate: [rotate, rotate + 360]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute -z-10"
            data-side={side}
          >
            <div
              style={{
                width: `${size}px`,
                transform: 'translate(0%, 0%)'
              }}
              className="aspect-square rounded-full bg-gradient-1"
            />
            <div
              style={{
                width: `${size}px`,
                transform: 'translate(-87%, -50%)'
              }}
              className="aspect-square rounded-full bg-gradient-2"
            />
            <div
              style={{
                width: `${size}px`,
                transform: 'translate(0%, -100%)'
              }}
              className="aspect-square rounded-full bg-gradient-3"
            />
          </m.div>
        )
      })}
    </div>
  )
}
