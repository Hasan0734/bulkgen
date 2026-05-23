import { GripVertical } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useDraggable } from '@dnd-kit/react'

type DraggableProps = {
  id: string
}

const Draggable = ({ id }: DraggableProps) => {
  const { ref } = useDraggable({
    id,
  })
  return (
    <div ref={ref}>
      <GripVertical className="hidden h-4 w-4 shrink-0 text-muted-foreground md:block" />
    </div>
  )
}

export default Draggable
