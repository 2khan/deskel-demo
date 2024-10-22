import { cn } from '@/lib/utils'

export default function BlurBackground(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const { className, children, ...rest } = props
  return (
    <div
      className={cn(
        'relative z-10 overflow-hidden border border-background bg-background text-base',
        className
      )}
      {...rest}
    >
      {children}
      <div
        style={{
          width: '1.75em',
          filter: 'blur(0.875em)',
          bottom: '0',
          right: '0',
          transform: 'translate(0%, 0%)',
          backgroundColor: 'hsl(var(--gradient-1))'
        }}
        className="absolute -z-10 aspect-square rounded-full"
      />
      <div
        style={{
          width: '1.75em',
          filter: 'blur(0.875em)',
          bottom: '50%',
          right: '0',
          transform: 'translate(-50%, 50%)',
          backgroundColor: 'hsl(var(--gradient-2))'
        }}
        className="absolute -z-10 aspect-square rounded-full"
      />
      <div
        style={{
          width: '1.75em',
          filter: 'blur(0.875em)',
          top: '0',
          right: '0',
          transform: 'translate(0%, 0%)',
          backgroundColor: 'hsl(var(--gradient-3))'
        }}
        className="absolute -z-10 aspect-square rounded-full"
      />
    </div>
  )
}
