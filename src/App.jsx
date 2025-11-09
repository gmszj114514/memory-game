import { useState } from "react";

const FRUITS = ["🍅", "🍊", "🍋", "🥝", "🍧", "🍇"];
const DEFAULT_REVEALED = [];
const DEFAULT_PAIRED = [];

export default function App() {
  let [ar, setAr] = useState([...FRUITS, ...FRUITS]);
  let [revealed, setRevealed] = useState(DEFAULT_REVEALED);
  let [paired, setPaired] = useState(DEFAULT_PAIRED);

  function handleClick(i) {
    if (revealed.includes(i) || paired.includes(i)) return;

    // if match
    for (let j of revealed) {
      // i = 2 // ar = [1, 6, 7]
      if (ar[j] == ar[i]) {
        setPaired([...paired, i, j]);
        setRevealed(revealed.filter((v) => v !== j));
        return;
      }
    }

    // if no match
    let copy = [...revealed, i];
    if (copy.length > 3) {
      copy.splice(0, 1);
    }
    setRevealed(copy);
  }

  function shuffle() {
    let copy = [...ar];
    for (let i = 0; i < 1000; i++) {
      let x = Math.floor(Math.random() * copy.length);
      let y = Math.floor(Math.random() * copy.length);
      let temp = copy[x];
      copy[x] = copy[y];
      copy[y] = temp;
    }
    setAr(copy);
    setRevealed(DEFAULT_REVEALED);
    setPaired(DEFAULT_PAIRED);
  }

  return (
    <div>
      <div>{JSON.stringify(revealed)}</div>
      <div>{JSON.stringify(paired)}</div>
      <div>
        <button className="btn" onClick={shuffle}>
          SHUFFLE
        </button>
        <br />
      </div>
      <div className="flex">
        {ar.map((v, i) => (
          <button
            key={i}
            className="btn h-10 w-10"
            style={{ background: paired.includes(i) ? "lightgreen" : "white" }}
            onClick={() => handleClick(i)}
          >
            {revealed.includes(i) || paired.includes(i) ? v : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
