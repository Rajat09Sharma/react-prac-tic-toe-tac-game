import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations.js"
import GameOver from "./components/GameOver.jsx";



const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function derivedCurrentPlayerSymbol(gameTurns) {
  let currentPlayerSymbol = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayerSymbol = "O";
  }

  return currentPlayerSymbol;
}

function App() {

  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2"
  })
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  // const [hasWinner,setHasWinnee]=useState(false);
  const currentPlayerSymbol = derivedCurrentPlayerSymbol(gameTurns);

  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstPlayerSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondPlayerSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdPlayerSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstPlayerSymbol && firstPlayerSymbol === secondPlayerSymbol && firstPlayerSymbol === thirdPlayerSymbol) {
      console.log(players);

      winner = players[firstPlayerSymbol];
    }
  }

  const hasDraw = gameTurns.length == 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((prevstate) => prevstate === "X" ? "O" : "X");

    setGameTurns((prevstate) => {
      const currentPlayerSymbol = derivedCurrentPlayerSymbol(prevstate);

      const updateGameTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayerSymbol }, ...prevstate];

      return [...updateGameTurns];
    })
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handleChangePlayerName(symbol, name) {
    setPlayers((prevstate) => {
      return {
        ...prevstate,
        [symbol]: name
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialPlayerName={players.X}
            symbol="X" isActivePlayer={currentPlayerSymbol === "X"}
            onChangePlayerName={handleChangePlayerName} />
          <Player
            initialPlayerName={players.O}
            symbol="O" isActivePlayer={currentPlayerSymbol === "O"}
            onChangePlayerName={handleChangePlayerName} />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard board={gameBoard} onSelect={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
