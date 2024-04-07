import { useDrag, useDragLayer } from "react-dnd";
import React, { useEffect, useState } from "react";

export function Shape({ children, onAddShape, type }) {
  const [currentPageOffset, setCurrentPageOffset] = useState({});
  const { offset } = useDragLayer((monitor) => ({
    offset: monitor.getClientOffset(),
  }));

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          const canvas = dropResult?.canvas;
          const currentOffset = canvas?.getBoundingClientRect();
          onAddShape({
            x: currentPageOffset?.x - currentOffset?.x,
            y: currentPageOffset?.y - currentOffset?.y,
          });
        }
      },
      collect: (monitor) => {
        return {
          opacity: monitor.isDragging() ? 0.5 : 1,
        };
      },
    }),
    [currentPageOffset]
  );

  useEffect(() => {
    if (offset) setCurrentPageOffset(offset);
  }, [offset]);

  return (
    <div draggable ref={dragRef} style={{ opacity }} className="cursor-pointer flex justify-center items-center">
      {children}
    </div>
  );
}