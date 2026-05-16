import { Card } from './ui/card'
import SchemaCardHeader from './SchemaCardHeader'
import FieldRow from './FieldRow'
import type { FieldDef, TableDef } from '#/lib/types'
import { uid } from '#/lib/utils'
import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

interface SchemaCardProps {
  table: TableDef
  tables: TableDef[]
  // onChange: (t: TableDef) => void
  // onRemove: () => void
}

const SchemaCard = ({ tables, table }: SchemaCardProps) => {
  return (
    <Card className="py-6 px-4 relative">
      <Accordion type="single" collapsible >
        <AccordionItem value={`table_${table.id}`} className='space-y-3'>
          <div className="absolute right-2 -top-1  ">
              <AccordionTrigger/>
          </div>
          <SchemaCardHeader table={table} />

          <AccordionContent>
            <div className="space-y-2">
              {table.fields.map((f) => (
                <FieldRow field={f} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default SchemaCard
