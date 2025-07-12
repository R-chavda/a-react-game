import { useState } from "react";
import Die from "./die"; // Assuming Die component is in './Die.js' or './Die/index.js'
import Confetti from "./Confetti"; // Assuming Confetti component is in './Confetti.js' or './Confetti/index.js'
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice()); // Initialize state directly with the result of the function

  const gameWon = () => {
    if (dice.length === 0) {
      return false;
    }
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    return allHeld && allSameValue;
  };

  function generateAllNewDice() {
    return Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: uuidv4(),
      }));
  }

  function rollDice() {
    if (!gameWon()) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map(({ id, value, isHeld }) => (
    <Die key={id} value={value} isHeld={isHeld} hold={() => hold(id)} />
  ));

  return (
    <main>
      {gameWon() && <Confetti />}
      <h1 className="title">
        {!gameWon() ? "Try your luck!" : "👑Jackpot!👑"}
      </h1>
      <p className="instructions">
        {!gameWon()
          ? "Roll until all dice are the same. Click each die to freeze it at its current value between rolls"
          : ""}
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {gameWon() ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
