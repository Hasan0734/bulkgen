import { Database, Trash2Icon } from 'lucide-react'
import { CardHeader } from './ui/card'
import TextInput from './TextInput'
import { Button } from './ui/button'
import type { TableDef } from '#/lib/types'
import { useTableStore } from '#/app/store'
import { useEffect, useState, } from 'react'
import { useDebounce } from 'use-debounce'

interface PropsType {
  table: TableDef,
}

const SchemaCardHeader = ({ table }: PropsType) => {
  const { removeTable, updateTable } = useTableStore()
  const [localName, setLocalName] = useState(table.name)
  const [localCount, setLocalCount] = useState(table.count)

  const [debouncedName] = useDebounce(localName, 300)
  const [debouncedCount] = useDebounce(localCount, 300)

  useEffect(() => {
    setLocalName(table.name)
  }, [table.name])

  useEffect(() => {
    setLocalCount(table.count)
  }, [table.count])

  useEffect(() => {
    if (debouncedName !== table.name && debouncedName.length) {
      updateTable({ ...table, name: debouncedName })
    }
  }, [debouncedName])

  useEffect(() => {
    if (debouncedCount !== table.count) {
      updateTable({ ...table, count: debouncedCount })
    }
  }, [debouncedCount])




  return (
    <CardHeader className="flex justify-between items-end px-0 w-full">
      <div className="flex items-center gap-3">
        <div  className="flex items-center justify-center size-9 bg-background rounded-lg">
          <Database size={18} />
        </div>
        <TextInput
          value={localName}
          onChange={(e) => setLocalName(e.target.value.replace(/\s+/g, '_'))}
          name="tableName"
          label="Table name"
        />
        <TextInput
          value={localCount}
          onChange={(e) =>
            setLocalCount(Math.min(5000, Number(e.target.value)))
          }
          min={1}
          max={5000}
          type="number"
          containerClass="w-24"
          name="rows"
          label="Rows"
        />
      </div>
      <div className="flex gap-1">
        <Button
          onClick={() => removeTable(table.id)}
          size={'icon'}
          variant={'destructive'}
        >
          <Trash2Icon />
        </Button>
      </div>
    </CardHeader>
  )
}

export default SchemaCardHeader
