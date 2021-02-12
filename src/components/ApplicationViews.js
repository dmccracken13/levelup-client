import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { GameForm } from "./game/GameForm.js"
import { EventProvider } from "./event/EventProvider.js"
import { EventList } from "./event/EventList.js"
import { EventForm } from "./event/EventForm.js"

export const ApplicationViews = (props) => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}> 
            <GameProvider>
                <Route exact path="/games">
                    <GameList {...props}/>
                </Route>
            </GameProvider>

            <GameProvider>   
                <Route exact path="/games/new">
                    <GameForm {...props}/>
                </Route>
            </GameProvider>    

            <EventProvider>
                <Route exact path="/events">
                    <EventList {...props}/>
                </Route>
            </EventProvider>

            <GameProvider>  
                <EventProvider>   
                    <Route exact path="/events/new">
                        <EventForm {...props}/>
                    </Route>
                </EventProvider> 
            </GameProvider>

        </main>
    </>
}