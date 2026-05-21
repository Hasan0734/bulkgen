import type { FieldDef } from '#/lib/types'
import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useDebounce } from 'use-debounce'

interface PropsType {
  name: string
  update: <K extends keyof FieldDef>(key: K, value: FieldDef[K]) => void
}

const InputWithDebounce = ({ name, update }: PropsType) => {
  const [local, setLocal] = useState(name)
  const [debouncedValue] = useDebounce(local, 300)

  useEffect(() => {
    setLocal(name)
  }, [name])

  useEffect(() => {
    if (debouncedValue !== name && debouncedValue.length) {
      update('name', debouncedValue)
    }
  }, [debouncedValue])
  return (
    <div>
      <Input
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="field_name"
        className="md:max-w-32 font-mono text-sm h-8"
      />
    </div>
  )
}

export default InputWithDebounce
