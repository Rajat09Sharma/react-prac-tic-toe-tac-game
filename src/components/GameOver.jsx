import React from 'react'

export default function GameOver({ winner, onRematch }) {
    return (
        <div id="game-over">
            {winner && <>
                <h2>You Won!</h2>
                <p>{winner}</p>
            </>
            }
            {!winner && <h2>Match Draws!</h2>}
            <button onClick={onRematch}>Rematch</button>
        </div>
    )
}
