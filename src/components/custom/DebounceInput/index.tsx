import { useEffect, useState } from 'react'
import { Input, type InputProps } from '@/components/ui/input'

type DebouncedInputProps = {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputProps, 'onChange'>

export default function DebouncedInput(props: DebouncedInputProps) {
  const { value: initialValue, onChange, debounce = 200, ...rest } = props
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <Input {...rest} value={value} onChange={(e) => setValue(e.target.value)} />
  )
}
