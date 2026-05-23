import React from 'react';
import {useDroppable} from '@dnd-kit/react';
import {CollisionPriority} from '@dnd-kit/abstract';

export function Column({children, id}:any) {
  const {isDropTarget, ref} = useDroppable({
    id,
    type: 'column',
    accept: 'item',
    collisionPriority: CollisionPriority.Low,
  });
  const style = isDropTarget ? {background: '#00000030'} : undefined;

  return (
    <div className="flex gap-5 w-full py-10 px-4 rounded-2xl" ref={ref} style={style}>
      {children}
    </div>
  );
}