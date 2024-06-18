
import React, { useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import Toolbar from './components/Toolbar/Toolbar';

const App: React.FC = () => {
  const [cursorMode, setCursorMode] = useState<boolean>(false);

  const handleToggleCursorMode = () => {
    setCursorMode(!cursorMode);
  };

  const handleAddShape = (shapeType: 'rectangle' | 'circle' | 'triangle') => {
    const event = new CustomEvent('addShape', { detail: shapeType });
    window.dispatchEvent(event);
  };

  return (
    <div>
      <Toolbar onAddShape={handleAddShape} onToggleCursorMode={handleToggleCursorMode} />
      <Canvas cursorMode={cursorMode} />
    </div>
  );
};

export default App;
