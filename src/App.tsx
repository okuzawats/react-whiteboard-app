import React from 'react';
import './App.css';

function App() {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  return (
    <div
      style={{ width: "1000px", height: "1000px", position: "relative" }}
      onDrop={ (e) => setPos({ x: e.clientX, y: e.clientY }) }
      onDragOver={ (e) => e.preventDefault() }
    >
      <div style={{ position: "absolute", top: pos.y + "px", left: pos.x + "px" }} draggable={true}>
        Thanks for all the fish.
      </div>
    </div>
  );
}

export default App;
