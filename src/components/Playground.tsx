import { PlusIcon } from 'lucide-react'
import { Button } from './ui/button'
import SchemaCard from './SchemaCard'
import { useTableStore } from '#/app/store'
import PreviewPanel from './PreviewPanel'

const Playground = () => {
  const { tables, addTable } = useTableStore()
  return (
    <div className='max-w-6xl mx-auto z-10 relative'>
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Schema</h3>
            <Button size={'lg'} onClick={addTable} className="rounded-full">
              <PlusIcon />
              Add Table
            </Button>
          </div>
          {tables.map((t) => (
            <SchemaCard table={t} />
          ))}
        </div>
        <PreviewPanel />
      </div>
    </div>
  )
}

export default Playground
