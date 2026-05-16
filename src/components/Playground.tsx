import { PlusIcon } from 'lucide-react'
import { Button } from './ui/button'
import SchemaCard from './SchemaCard'
import { useState } from 'react'
import type { TableDef } from '#/lib/types'
import { uid } from '#/lib/utils'
import { useTableStore } from '#/app/store'

const initial: TableDef[] = [
  {
    id: uid(),
    name: 'users',
    count: 10,
    fields: [
      { id: 'u1', name: 'id', type: 'uuid' },
      { id: 'u2', name: 'full_name', type: 'fullName' },
      { id: 'u3', name: 'email', type: 'email' },
      { id: 'u4', name: 'country', type: 'country' },
      {
        id: 'u5',
        name: 'role',
        type: 'enum',
        enumValues: 'admin, member, viewer',
      },
      { id: 'u6', name: 'active', type: 'boolean' },
    ],
  },
  {
    id: uid(),
    name: 'orders',
    count: 20,
    fields: [
      { id: 'o1', name: 'id', type: 'autoIncrement' },
      { id: 'o2', name: 'user_id', type: 'relation' },
      { id: 'o3', name: 'product', type: 'productName' },
      { id: 'o4', name: 'amount', type: 'price', min: 10, max: 800 },
      {
        id: 'o5',
        name: 'status',
        type: 'enum',
        enumValues: 'paid, pending, refunded',
      },
      { id: 'o6', name: 'created_at', type: 'pastDate' },
      { id: 'o7', name: 'currency', type: 'static', staticValue: 'USD' },
    ],
  },
]

const Playground = () => {
  // const [tables, setTables] = useState<TableDef[]>(initial)

  // const addTable = () => {
  //   setTables((ts) => [
  //     ...ts,
  //     {
  //       id: uid(),
  //       name: `table_${ts.length + 1}`,
  //       count: 10,
  //       fields: [{ id: uid(), name: 'id', type: 'uuid' }],
  //     },
  //   ])
  // }


  const {tables, addTable} = useTableStore()

  return (
    <div className="grid grid-cols-2 p-6 bg-active/20 rounded-xl">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Schema</h3>
          <Button onClick={addTable} className="rounded-md" variant={'outline'}>
            <PlusIcon />
            Add Table
          </Button>
        </div>
        {tables.map((t) => (
          <SchemaCard tables={tables} table={t} />
        ))}
      </div>
    </div>
  )
}

export default Playground
