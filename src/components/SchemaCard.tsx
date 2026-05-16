import { Card } from './ui/card'
import SchemaCardHeader from './SchemaCardHeader'
import FieldRow from './FieldRow'
import type { FieldDef, TableDef } from '#/lib/types'
import { useMemo, useState } from 'react'

import { Button } from './ui/button'
import { ChevronDown, Plus } from 'lucide-react'
import { useTableStore } from '#/app/store'
import { cn } from '#/lib/utils'
import { AnimatePresence, motion } from 'motion/react'

interface SchemaCardProps {
  table: TableDef

}

const SchemaCard = ({ table }: SchemaCardProps) => {
  const { addTableField, removeField, updateTableField } = useTableStore()
  const [isOpen, setIsOpen] = useState(false)

  const renderedFields = useMemo(() => {
    return table.fields.map((f) => (
      <FieldRow
        onChange={(f:FieldDef) =>
          updateTableField(f, table)
        }
        currentTableId={table.id}
        onRemove={() => removeField(table, f.id)}
        key={f.id || f.name}
        field={f}
      />
    ))
  }, [table.fields])

  return (
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
            className="overflow-hidden"
          >
            <div className={cn('space-y-2')}>
              {renderedFields}

              <Button
                onClick={() => addTableField(table)}
                variant={'secondary'}
                className="h-11 w-full "
              >
                <Plus /> Add Field
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default SchemaCard
