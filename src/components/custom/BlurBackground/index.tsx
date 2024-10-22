import { cn } from '@/lib/utils'

type TProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  size?: number
}

export default function BlurBackground(props: TProps) {
  const { className, children, size = 24, ...rest } = props
  const filterValue = size / 2
  return (
    <div
      className={cn(
        'relative z-10 overflow-hidden border border-background bg-background',
        className
      )}
      {...rest}
    >
      {children}
      <div
        style={{
          width: `${size}px`,
          filter: `blur(${filterValue}px)`,
          bottom: '0',
          right: '0',
          transform: 'translate(0%, 0%)',
          backgroundColor: 'hsl(var(--gradient-1))'
        }}
        className="absolute -z-10 aspect-square rounded-full"
      />
      <div
        style={{
          width: `${size}px`,
          filter: `blur(${filterValue}px)`,
          bottom: '0%',
          right: '0%',
          transform: 'translate(-45%, -33%)',
          backgroundColor: 'hsl(var(--gradient-2))'
        }}
        className="absolute -z-10 aspect-square rounded-full"
      />
      <div
        style={{
          width: `${size}px`,
          filter: `blur(${filterValue}px)`,
          bottom: '0',
          right: '0',
          transform: 'translate(0%, -66%)',
          backgroundColor: 'hsl(var(--gradient-3))'
        }}
        className="absolute -z-10 aspect-square rounded-full"
      />
    </div>
  )
}
