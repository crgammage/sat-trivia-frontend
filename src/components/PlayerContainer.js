import React from 'react'
import PlayerCard from './PlayerCard.js'

function PlayerContainer(props) {
   const {currentUser, users} = props
    return (
        <div>
            <h1>This is the Player Container</h1>
            <PlayerCard currentUser={currentUser}/>
            
        </div>
        
    )
}

export default PlayerContainer