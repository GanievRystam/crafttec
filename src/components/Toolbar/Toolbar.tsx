
import React, { useState } from 'react';
import './Toolbar.css';

interface ToolbarProps {
  onAddShape: (shapeType: 'rectangle' | 'circle' | 'triangle') => void;
  onToggleCursorMode: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddShape, onToggleCursorMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleShapeClick = (shapeType: 'rectangle' | 'circle' | 'triangle') => {
    onAddShape(shapeType);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div id="tools-panel">
      <button id="shape-dropdown-btn" onClick={toggleDropdown}>
        Shapes ▼
      </button>
      {dropdownOpen && (
        <div id="shape-dropdown-content" className="dropdown-content">
          <button onClick={() => handleShapeClick('rectangle')}>Rectangle</button>
          <button onClick={() => handleShapeClick('circle')}>Circle</button>
          <button onClick={() => handleShapeClick('triangle')}>Triangle</button>
        </div>
      )}
      <button onClick={onToggleCursorMode}>Cursor</button>
    </div>
  );
};

export default Toolbar;
