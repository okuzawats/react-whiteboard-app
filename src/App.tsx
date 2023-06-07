import React from 'react';
import './App.css';

function App() {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [text, setText] = React.useState("Thanks for all the fish.");
  const [editMode, setEditMode] = React.useState(false);

  return (
    <div
      style={{ width: "1000px", height: "1000px", position: "relative" }}
      onDrop={ (e) => setPos({ x: e.clientX, y: e.clientY }) }
      onDragOver={ (e) => e.preventDefault() }
    >
      <div style={{ position: "absolute", top: pos.y + "px", left: pos.x + "px" }} draggable={true}>
        { editMode ? (
          <textarea
            onBlur={(e) => setEditMode(false)}
            onChange={(e) => setText(e.target.value)}
            defaultValue={text}
          />
        ) : (
          <div onClick={(e) => setEditMode(true)}>{text}</div>
        )}
      </div>
    </div>
  );
}

export default App;
