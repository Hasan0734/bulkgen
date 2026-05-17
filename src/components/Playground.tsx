import { PlusIcon } from 'lucide-react'
import { Button } from './ui/button'

import PreviewPanel from './PreviewPanel'
import { useShallow } from 'zustand/shallow'
import SchemaCard from './SchemaCard'
import { useTableStore } from '#/app/store'
import { ScrollArea } from './ui/scroll-area'

const Playground = () => {
  const addTable  = useTableStore((state) => state.addTable);
  const tableIds = useTableStore(
    useShallow((state) => state.tables.map((tb) => tb.id)),
  )

  return (
    <div className="container mx-auto relative  bg-card p-10 rounded-4xl min-h-[calc(100vh-150px)] h-full overflow-hidden">
      <div className="grid grid-cols-2 gap-10 ">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Schema</h3>
            <Button size={'lg'} onClick={addTable} className="rounded-full">
              <PlusIcon />
              Add Table
            </Button>
          </div>
          <ScrollArea className=" h-170 pr-1">
            <div className="space-y-5 p-2">
              {tableIds.map((id) => (
                <SchemaCard key={id} tableId={id} />
              ))}
            </div>
          </ScrollArea>
        </div>
        {/* <div className="lg:sticky lg:top-20 self-start"> */}
        <PreviewPanel />
        {/* </div> */}
      </div>
    </div>
  )
}

export default Playground
