import type { FieldDef } from '#/lib/types'
import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useDebounce } from 'use-debounce'

interface PropsType {
  name: string
  update: <K extends keyof FieldDef>(key: K, value: FieldDef[K]) => void
}

const InputWithDebounce = ({ name, update, ...props }: PropsType) => {
  const [local, setLocal] = useState(name)
  const [debouncedValue] = useDebounce(local, 300)

  useEffect(() => {
    setLocal(name)
  }, [name])

  useEffect(() => {
    if (debouncedValue !== name && debouncedValue.length) {
      console.log('is updated')
      update('name', debouncedValue)
    }
  }, [debouncedValue])
  return (
    <div>
      <Input
        value={local}
        onChange={(e) => {
          const value = e.target.value
          if (value.length === 0 || value.length > 50) return

          setLocal(e.target.value.replace(/\s+/g, '_'))
        }}
        placeholder="field_name"
        className="md:max-w-32 font-mono text-sm h-8"
        {...props}
      />
    </div>
  )
}

export default InputWithDebounce
