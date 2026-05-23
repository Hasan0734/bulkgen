import { Card } from './ui/card'
import FieldRow from './FieldRow'
import type { FieldDef } from '#/lib/types'
import { useMemo, useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown, Plus } from 'lucide-react'
import { useTableStore } from '#/app/store'
import { cn } from '#/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import { useShallow } from 'zustand/shallow'
import SchemaCardHeader from './SchemaCardHeader'

interface SchemaCardProps {
  tableId: string
  index: number
}

const SchemaCard = ({ tableId, index }: SchemaCardProps) => {
  const { addTableField, removeField, updateTableField } = useTableStore()
  const table = useTableStore(
    useShallow((state) => state.tables.find((tb) => tb.id === tableId)),
  )
  const [isOpen, setIsOpen] = useState(true)

  if (!table) return null

  const renderedFields = useMemo(() => {
    return table.fields.map((f, idx) => (
      <FieldRow
        onChange={(f: FieldDef) => updateTableField(f, table)}
        currentTableId={table.id}
        onRemove={() => removeField(table, f.id)}
        key={f.id || f.name}
        field={f}
        index={idx}
      />
    ))
  }, [table.fields])


  // const { ref, isDropTarget } = useDroppable({
  //   id: tableId,
  //   type: 'table',
  //   accept: ['field'],
  //   data: table,
  //   collisionPriority: CollisionPriority.Low,
  // })

  return (
    <>
      <Card className="py-4 px-4 relative overflow-hidden">
        <div className="absolute -right-1 -top-1  ">
          <Button
            size="icon"
            variant={'outline'}
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 0 : 180 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
        <SchemaCardHeader table={table} />

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key={'content'}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden "
            >
              <div className={cn('space-y-2')}>
                {renderedFields}
               
                <Button
                  onClick={() => addTableField(table)}
                  variant={'secondary'}
                  className="h-11 w-full"
                >
                  <Plus /> Add Field
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>


    </>
  )
}

export default SchemaCard



      // <DragOverlay>
      //   {(source) => {
      //     return (
      //       <Card className="py-4 px-4 relative overflow-hidden">
      //         <div className="absolute -right-1 -top-1  ">
      //           <Button size="icon" variant={'outline'}>
      //             <motion.div
      //               animate={{ rotate: isOpen ? 0 : 180 }}
      //               transition={{ duration: 0.2 }}
      //             >
      //               <ChevronDown className="h-4 w-4" />
      //             </motion.div>
      //           </Button>
      //         </div>
      //         <SchemaCardHeader table={source.data as TableDef} />
      //       </Card>
      //     )
      //   }}
      // </DragOverlay>