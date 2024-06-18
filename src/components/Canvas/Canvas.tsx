import React, { useRef, useEffect, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Circle, RegularPolygon } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

interface ShapeConfig extends Konva.ShapeConfig {
  type: 'Rect' | 'Circle' | 'RegularPolygon';
  id: string;
}

interface CanvasProps {
  cursorMode: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ cursorMode }) => {
  const stageRef = useRef<Konva.Stage>(null);
  const [shapes, setShapes] = useState<ShapeConfig[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) {
      stage.container().style.cursor = cursorMode ? 'move' : 'default';
    }
  }, [cursorMode]);


  const handleAddShape = (shapeType: 'rectangle' | 'circle' | 'triangle') => {
    const newShape: ShapeConfig = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      id: uuidv4(),
      type: shapeType === 'rectangle' ? 'Rect' : shapeType === 'circle' ? 'Circle' : 'RegularPolygon',
      fill: shapeType === 'rectangle' ? 'green' : shapeType === 'circle' ? 'blue' : 'red',
      shadowBlur: 10,
      draggable: true,
      ...(shapeType === 'rectangle' ? { width: 100, height: 50 } : {}),
      ...(shapeType === 'circle' ? { radius: 50 } : {}),
      ...(shapeType === 'triangle' ? { sides: 3, radius: 50 } : {}),
    };
    setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  useEffect(() => {
    const addShapeListener = (e: Event) => {
      const customEvent = e as CustomEvent<'rectangle' | 'circle' | 'triangle'>;
      handleAddShape(customEvent.detail);
    };
    window.addEventListener('addShape', addShapeListener as EventListener);
    return () => {
      window.removeEventListener('addShape', addShapeListener as EventListener);
    };
  }, []);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {shapes.map((shape) => {
          switch (shape.type) {
            case 'Rect':
              return (
                <Rect
                  key={shape.id}
                  {...shape}
                />
              );
            case 'Circle':
              return (
                <Circle
                  key={shape.id}
                  {...shape}
                />
              );
            case 'RegularPolygon':
              return (
                <RegularPolygon
                  sides={0} radius={0} key={shape.id}
                  {...shape} />
              );
            default:
              return null;
          }
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
