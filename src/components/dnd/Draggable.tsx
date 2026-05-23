import {useDraggable} from '@dnd-kit/react';
import { Button } from '../ui/button';

export function Draggable(props:any) {
  const {ref} = useDraggable({
    id: props.id,
  });

  return <Button ref={ref}>draggable</Button>;
}