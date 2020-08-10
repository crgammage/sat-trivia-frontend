import React from 'react'
import PlayerCard from './PlayerCard.js'

function PlayerContainer(props) {
   const {currentUser, users} = props
    return (
        <div>
            <PlayerCard />
            
        </div>
        
    )
}

export default PlayerContainer