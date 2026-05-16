import { Database, Trash2Icon } from 'lucide-react'
import { CardHeader } from './ui/card'
import TextInput from './TextInput'
import { Button } from './ui/button'
import type { TableDef } from '#/lib/types'


interface PropsType {
  table: TableDef
}

const SchemaCardHeader = ({ table }: PropsType) => {
  return (
    <CardHeader className="flex justify-between items-end px-0 w-full">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-9 bg-active/20 rounded-lg">
          <Database size={18} />
        </div>
        <TextInput value={table.name} name="tableName" label="Table name" />
        <TextInput
          value={table.count}
          min={1}
          max={500}
          type="number"
          containerClass="w-24"
          name="rows"
          label="Rows"
        />
      </div>
      <div className='flex gap-1'>
        <Button size={'icon'} variant={'destructive'}>
          <Trash2Icon />
        </Button>
       
      </div>

    </CardHeader>
  )
}

export default SchemaCardHeader
