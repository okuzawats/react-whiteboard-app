import React from 'react';
import './App.css';

interface Card {
  t: string;
  x: number;
  y: number;
}

interface CardsState {
  [key: string]: Card;
}

interface EditModeState {
  key: string;
}

function App() {
  const [cards, setCards] = React.useState<CardsState>({
    id1: { t: "Text1", x: 100, y: 100 },
    id2: { t: "Text2", x: 200, y: 300 },
  });
  const update = (key: string, card: Card) => setCards({ ...cards, [key]: card });
  const [dragging, setDragging] = React.useState({ key: "", x: 0, y: 0 });
  const [editMode, setEditMode] = React.useState<EditModeState>({ key: "" });

  return (
    /* onDropイベントを発火させるためにonDragOver内でpreventDefaultを呼び出す必要がある。 */
    <div
      style={{ width: "1000px", height: "1000px", position: "relative" }}
      onDrop={ (e) => {
        if (!dragging || !cards) return;
        update(dragging.key, { ...cards[dragging.key], x: e.clientX - dragging.x, y: e.clientY - dragging.y });
      }}
      onDragOver={ (e) => e.preventDefault() }
    >
      { Object.keys(cards).map((key) => (
        <div
          key={key}
          style={{ position: "absolute", top: cards[key].y + "px", left: cards[key].x + "px" }}
          draggable={true}
          onDragStart={(e) => setDragging({ key, x: e.clientX - cards[key].x, y: e.clientY - cards[key].y })}
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
