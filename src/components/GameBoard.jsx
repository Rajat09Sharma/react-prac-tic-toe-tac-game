

export default function GameBoard({ onSelect, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => onSelect(rowIndex, colIndex)} type='button' disabled={playerSymbol !== null}>{playerSymbol}</button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}


// const [gameBoard,setGameBoard]=useState(initialGameBoard);

// function handleSelectedSquare(rowIndex,colIndex){
//     setGameBoard((prevsState)=>{
//         const updatedGameBoard=[...prevsState.map(innerArray=>[...innerArray])] // deeply nexted copy of previous state.
//         updatedGameBoard[rowIndex][colIndex]=activePlayerSymbol;
//         return [...updatedGameBoard];
//     });
//     onSelect(rowIndex,colIndex);
// }