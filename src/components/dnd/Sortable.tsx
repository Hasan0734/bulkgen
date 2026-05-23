import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import { useState } from 'react'
import { isSortable, useSortable } from '@dnd-kit/react/sortable'
import { arrayMove } from '@dnd-kit/helpers'
import { GripVertical } from 'lucide-react'
import { CollisionPriority } from '@dnd-kit/abstract'

const initialData = [
  { id: 'col-A', name: 'A', items: ['a1', 'a2', 'a3', 'a4'] },
  { id: 'col-B', name: 'B', items: ['b1', 'b2', 'b3', 'b4'] },
  { id: 'col-C', name: 'C', items: ['c1', 'c2', 'c3', 'c4'] },
]

const Sortable = () => {
  const [kanvanData, setKanvanData] = useState(initialData)

  return (
    <section className="max-w-6xl mx-auto p-4">
      <DragDropProvider
        onDragOver={(event) => {
          const { source, target } = event.operation

          console.log(source?.type, target?.type)
          if (!source || !target || source.type !== 'item') return

          const sourceColumnId = source.data.columnId

          const targetColumnId =
            target.type === 'column' ? target.id : target.data?.columnId

          if (
            !sourceColumnId ||
            !targetColumnId ||
            sourceColumnId === targetColumnId
          )
            return

          setKanvanData((prev) => {
            const data = prev.map((col) => ({ ...col, items: [...col.items] }))

            const sourceColumn = data.find((c) => c.id === sourceColumnId)
            const targetColumn = data.find((c) => c.id === targetColumnId)

            if (!sourceColumn || !targetColumn) return prev

            const movingItem = source.id

            sourceColumn.items = sourceColumn.items.filter(
              (i) => i !== movingItem,
            )

            if (target.type === 'item') {
              const targetItemValue = target.id
              const targetIndex = targetColumn.items.indexOf(
                targetItemValue as string,
              )
              targetColumn.items.splice(targetIndex, 0, movingItem as string)
            } else {
              targetColumn.items.push(movingItem as string)
            }

            return data
          })
        }}
        onDragEnd={(event) => {
          if (event.canceled) return

          const { source } = event.operation
          if (!isSortable(source)) return

          const { type, initialIndex, index, group } = source

          // Column Reordering
          if (type === 'column') {
            setKanvanData((prev) => arrayMove(prev, initialIndex, index))
            return
          }

          // Item Intra-column Reordering
          if (type === 'item') {
            setKanvanData((prev) =>
              prev.map((column) => {
                if (column.id !== group) return column
                return {
                  ...column,
                  items: arrayMove(column.items, initialIndex, index),
                }
              }),
            )
          }
        }}
      >
        <div className="grid grid-cols-3 gap-5 w-full">
          {kanvanData.map((column, idx) => (
            <SortableCard key={column.id} column={column} index={idx} />
          ))}
        </div>

        <DragOverlay dropAnimation={{ duration: 150, easing: 'ease-out' }}>
          {(source) => {
            if (!source) return null
            if (source.type === 'column') {
              return <OverlayCard column={source.data} />
            }
            // Strip the unique prefix for clean rendering inside the overlay portal
            return <OverlayTodo todo={source.data.value} />
          }}
        </DragOverlay>
      </DragDropProvider>
    </section>
  )
}

export default Sortable

const SortableCard = ({ column, index }: any) => {
  const { ref, handleRef, isDragging } = useSortable({
    id: column.id,
    index,
    type: 'column',
    accept: ['item', 'column'],
    data: column,
    collisionPriority: CollisionPriority.Low,
  })

  return (
    <div
      style={{ opacity: isDragging ? 0.4 : 1 }}
      ref={ref}
      className="bg-card border rounded-2xl min-h-52 overflow-hidden flex flex-col"
    >
      <div className="text-xl p-2 bg-amber-300 flex items-center justify-between shadow-sm">
        <h2>{column.name}</h2>
        <button
          ref={handleRef}
          className="cursor-grab active:cursor-grabbing p-1"
        >
          <GripVertical size={20} />
        </button>
      </div>
      <div className="p-3 bg-accent/30 flex-1 space-y-3 min-h-[150px]">
        {column.items.map((todo: any, idx: any) => (
          <Todo key={todo} todo={todo} index={idx} columnId={column.id} />
        ))}
      </div>
    </div>
  )
}

const Todo = ({ todo, index, columnId }: any) => {
  const { ref, handleRef, isDragging } = useSortable({
    id: todo,
    index,
    type: 'item',
    accept: ['item'],
    group: columnId,
    collisionPriority: CollisionPriority.Low,
    data: { value: todo, columnId },
  })

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.3 : 1 }}
      className="bg-white border shadow-sm rounded-md p-2 flex gap-4 items-center"
    >
      <button ref={handleRef} className="cursor-grab active:cursor-grabbing">
        <GripVertical size={16} />
      </button>
      <h3 className="uppercase text-sm font-medium">{todo}</h3>
    </div>
  )
}

// Clean UI implementations for the DragOverlays
const OverlayCard = ({ column }: any) => (
  <div className="bg-white border-2 border-amber-400 shadow-xl rounded-2xl min-h-52 overflow-hidden opacity-90">
    <div className="text-xl p-2 bg-amber-300 flex items-center justify-between">
      <h2>{column.name}</h2>
      <GripVertical size={20} />
    </div>
    <div className="p-3 bg-accent/30 space-y-3">
      {column.items.map((todo: any) => (
        <div
          key={todo}
          className="bg-white border rounded-md p-2 flex gap-4 items-center"
        >
          <GripVertical size={16} />
          <h3 className="uppercase text-sm font-medium">{todo}</h3>
        </div>
      ))}
    </div>
  </div>
)

const OverlayTodo = ({ todo }: any) => (
  <div className="bg-white border-2 border-primary/30 shadow-md rounded-md p-2 flex gap-4 items-center transform rotate-2 opacity-90">
    <GripVertical size={16} />
    <h3 className="uppercase text-sm font-medium">{todo}</h3>
  </div>
)
