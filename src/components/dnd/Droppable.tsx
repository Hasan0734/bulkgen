import {useDroppable} from '@dnd-kit/react';

export function Droppable({children, id}:any) {
  const {isDropTarget, ref} = useDroppable({id: id});

  return (
    <div ref={ref} className={isDropTarget ? " p-4 size-40 bg-accent mt-4" : "bg-card p-4 size-40 mt-4"}>
      {children}

    </div>
  );
}