import { useState } from "react"


export default function Player({ initialPlayerName, symbol, isActivePlayer, onChangePlayerName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialPlayerName);

    function handleClick() {
        setIsEditing((prevState) => !prevState);
        if (isEditing) {
            onChangePlayerName(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let btnName = "Edit";

    if (isEditing) {
        btnName = "Save";
    }

    return (
        <li className={isActivePlayer ? "active" : undefined}>
            <span className="player">
                {!isEditing && <span className="player-name">
                    {playerName}
                </span>}
                {isEditing && <input type="text" value={playerName} onChange={handleChange} />}
                <span className="player-symbol">
                    {symbol}
                </span>
            </span>
            <button type="button" onClick={handleClick}>{btnName}</button>
        </li>
    )
}
