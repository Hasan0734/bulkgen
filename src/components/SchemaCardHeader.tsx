import { Database, Trash2Icon } from 'lucide-react'
import { CardHeader } from './ui/card'
import TextInput from './TextInput'
import { Button } from './ui/button'
import type { TableDef } from '#/lib/types'
import { useTableStore } from '#/app/store'

interface PropsType {
  table: TableDef
}

const SchemaCardHeader = ({ table }: PropsType) => {
  const { removeTable, updateTable } = useTableStore()

  const handleChange = <K extends keyof TableDef>(
    key: K,
    value: TableDef[K],
  ) => {
    updateTable({ ...table, [key]: value })
  }
  return (
    <CardHeader className="flex justify-between items-end px-4 w-full">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-9 bg-active/20 rounded-lg">
          <Database size={18} />
        </div>
        <TextInput
          value={table.name}
          onChange={(e) =>
            handleChange('name', e.target.value.replace(/\s+/g, '_'))
          }
          name="tableName"
          label="Table name"
        />
        <TextInput
          value={table.count}
          onChange={(e) =>
            handleChange('count', Math.min(5000, Number(e.target.value)))
          }
          min={1}
          max={500}
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
