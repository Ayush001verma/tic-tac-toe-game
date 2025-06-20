import React from "react";
import Navbar from "./Components/Navbar";

function App() {
  let counter = 0;
  let curr_symbol = "";

  function start_game() {
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        const el = document.getElementById(`${i}${j}`);
        if (el) el.innerText = "";
      }
    }
    counter = 0;
    const input = document.getElementById("user_symbol");
    input.value = "";
    curr_symbol = "";
  }

  function toggle_symbol() {
    curr_symbol = curr_symbol === "X" ? "O" : "X";
  }

  function check_winner(curr_id, symbol) {
    const x = parseInt(curr_id[0]);
    const y = parseInt(curr_id[1]);

    const getVal = (i, j) => document.getElementById(`${i}${j}`).innerText;
    const same = (a, b, c) => a && a === b && b === c;

    let win = false;

    if (same(getVal(x, 1), getVal(x, 2), getVal(x, 3))) win = true;
    else if (same(getVal(1, y), getVal(2, y), getVal(3, y))) win = true;
    else if (x === y && same(getVal(1, 1), getVal(2, 2), getVal(3, 3))) win = true;
    else if (x + y === 4 && same(getVal(1, 3), getVal(2, 2), getVal(3, 1))) win = true;

    if (win) {
      setTimeout(() => {
        alert(`🎉 Player ${symbol} wins!`);
        start_game();
      }, 100);
    } else if (counter === 9) {
      setTimeout(() => {
        alert("It's a draw!");
        start_game();
      }, 100);
    }
  }

  function put_symbol(e) {
    const id = e.target.id;
    const el = document.getElementById(id);

    if (curr_symbol === "") {
      alert("⚠️ Please set Player 1's symbol first!");
      return;
    }

    if (el && el.innerText === "") {
      el.innerText = curr_symbol;
      counter++;
      const played_symbol = curr_symbol;
      check_winner(id, played_symbol);
      toggle_symbol();
    }
  }

  function setPlayerSymbol() {
    const elem = document.getElementById("user_symbol");
    const val = elem.value.toUpperCase();

    if (val !== "X" && val !== "O") {
      alert("❗ Please enter a valid symbol: X or O");
      elem.value = "";
    } else {
      start_game();
      curr_symbol = val;
    }
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow px-4 py-10 text-center text-gray-800 bg-gray-100 min-h-screen space-y-10">
        {/* Input + Set Button */}
        <div className="space-y-4">
          <input
            id="user_symbol"
            type="text"
            placeholder="Player 1 choose (X / O)"
            className="px-4 py-2 border-3 border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-center uppercase"
          />
          <br />
          <button
            onClick={setPlayerSymbol}
            className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold transform transition-transform duration-200 hover:scale-105 hover:bg-blue-700"
          >
            🎮 Set Player Symbol
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-rows-3 gap-4 max-w-fit mx-auto border-4 border-gray-600 rounded-xl bg-gray-200 p-4">
          {[1, 2, 3].map((i) => (
            <div key={i} id={`row${i}`} className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((j) => (
                <div
                  key={`${i}${j}`}
                  id={`${i}${j}`}
                  onClick={put_symbol}
                  className="h-32 w-32 bg-white rounded-md border-2 border-gray-600 hover:scale-105 transition-transform text-6xl font-extrabold flex items-center justify-center cursor-pointer select-none"
                ></div>
              ))}
            </div>
          ))}
        </div>

        {/* Restart Button */}
        <button
          onClick={start_game}
          className="px-6 py-2 rounded-md bg-green-600 text-white font-semibold transform transition-transform duration-200 hover:scale-105 hover:bg-green-700"
        >
          🔁 Start New Game
        </button>
      </main>

      <footer className="bg-gray-900 text-white text-sm text-center py-4 mt-10">
        © {new Date().getFullYear()} Tic Tac Toe Game. All rights reserved.
      </footer>
    </>
  );
}

export default App;
