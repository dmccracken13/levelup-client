import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "../game/GameProvider.js"
import { EventContext } from "./EventProvider.js"
import { useHistory } from 'react-router-dom'

export const EventForm = (props) => {
    const history = useHistory()
    const { getEvents, createEvent } = useContext(EventContext)
    const { games, getGames } = useContext(GameContext)

    const [ game, setGame] = useState()

    const [currentEvent, setEvent] = useState({
        scheduledTime: "",
        gameId: 0,
        location: ""
    })

    useEffect(() => {
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[domEvent.target.name] = domEvent.target.value
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>
                                {game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="scheduledTime">Time: </label>
                    <input type="datetime-local" name="scheduledTime" required autoFocus className="form-control"
                        value={currentEvent.scheduledTime}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event = {
                        scheduledTime: currentEvent.scheduledTime,
                        gameId: parseInt(currentEvent.gameId),
                        location: currentEvent.location,
                    }
                    // Create the event
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}