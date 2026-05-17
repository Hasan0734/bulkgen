import { PlusIcon } from 'lucide-react'
import { Button } from './ui/button'

import PreviewPanel from './PreviewPanel';
import { useShallow} from 'zustand/shallow'
import SchemaCard from './SchemaCard';
import { useState } from 'react';
import { useTableStore } from '#/app/store';

const Playground = () => {
  // const addTable  = useTableStore((state) => state.addTable);
  const tableIds = useTableStore(useShallow((state) => state.tables.map((tb) => tb.id)));


  return (
    <div className="max-w-6xl mx-auto z-10 relative">
      <div className="grid grid-cols-2 gap-10 ">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Schema</h3>
            <Button size={'lg'} className="rounded-full">
              <PlusIcon />
              Add Table
            </Button>
          </div>
          {tableIds.map((id) => (
            <SchemaCard key={id} tableId={id} />
           
          ))}
        </div>
        <div className="lg:sticky lg:top-20 self-start">
          <PreviewPanel />
        </div>
      </div>
    </div>
  )
}

export default Playground
