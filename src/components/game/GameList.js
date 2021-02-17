import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    return (
    <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                props.history.push({ pathname: "/games/new" })
            }}
        >Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__description">Description: {game.description}</div>
                        <div className="game__type">Game Type: {game.game_type.types}</div>
                        <button className="btn btn-3"
                                    onClick={e => props.history.push(`/games/${game.id}/edit`)}
                                    >Edit</button>
                    </section>
                })
            }
        </article>
    </>
    )
}