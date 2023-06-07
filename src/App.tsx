import React from 'react';
import './App.css';

function App() {
  const [cards, setCards] = React.useState({
    id1: { t: "Text1", x: 100, y: 100 },
    id2: { t: "Text2", x: 200, y: 300 },
  });
  const update = (key: string, card: object) => setCards({ ...cards, [key]: card });

  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [editMode, setEditMode] = React.useState({ key: "" });

  return (
    /* onDropイベントを発火させるためにonDragOver内でpreventDefaultを呼び出す必要がある。 */
    <div
      style={{ width: "1000px", height: "1000px", position: "relative" }}
      onDrop={ (e) => setPos({ x: e.clientX, y: e.clientY }) }
      onDragOver={ (e) => e.preventDefault() }
    >
      { Object.keys(cards).map((key) => (
        <div
          key={key}
          style={{ position: "absolute", top: cards[key].y + "px", left: cards[key].x + "px" }}
          draggable={true}
        >
          { 
            /*
            * editMode = trueの時は編集可能なtextareaを表示する。
            * onBlurイベント（フォーカスを失った時に発火する）で編集完了し、textを確定する。
            */
            editMode.key === key ? (
              <textarea
                onBlur={(e) => setEditMode({ key: " "})}
                onChange={(e) => update(key, { ...cards[key], t: e.target.value })}
                defaultValue={cards[key].t}
              />
            ) : (
              <div onClick={(e) => setEditMode({ key })}>
                {cards[key].t}
              </div>
            )
          }
        </div>
      ))}
    </div>
  );
}

export default App;
