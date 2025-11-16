import { useState } from "react";
import "./App.css"; // Importing CSS for styling

const FRUITS = ["🍅", "🍊", "🍋", "🥝", "🍧", "🍇"];
const DEFAULT_REVEALED = [];
const DEFAULT_PAIRED = [];
const INITIAL_LIVES = 10;

export default function App() {
  let [ar, setAr] = useState([...FRUITS, ...FRUITS]);
  let [revealed, setRevealed] = useState(DEFAULT_REVEALED);
  let [paired, setPaired] = useState(DEFAULT_PAIRED);
  let [lives, setLives] = useState(INITIAL_LIVES);

  function handleClick(i) {
    if (revealed.includes(i) || paired.includes(i) || lives <= 0) return;

    // if match
    for (let j of revealed) {
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
    setLives(lives - 1);
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
    setLives(INITIAL_LIVES);
  }

  return (
    <div className="game-container">
      <h1 className="game-title">Memory Game</h1>
      <div className="game-info">
        <button className="btn shuffle-btn" onClick={shuffle}>
          SHUFFLE
        </button>
        <p className="lives-info">Lives: {lives}</p>
        {lives <= 0 && <p className="game-over">Game Over</p>}
      </div>
      <div className="game-board">
        {ar.map((v, i) => (
          <button
            key={i}
            className={`card ${paired.includes(i) ? "paired" : ""}`}
            onClick={() => handleClick(i)}
            disabled={lives <= 0}
          >
            {revealed.includes(i) || paired.includes(i) ? v : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
