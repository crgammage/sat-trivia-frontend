import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import GameCard from './GameCard.js'

const PlayerCard = props => {
    let { currentUser } = props
    let [ involvedGames, setInvolvedGames] = useState([])
            

    const currentGames = () => {
        let user = currentUser
        if (user.games) {
            console.log(user.games)
           user.games.map((game) => (
           <GameCard key={game.id} {...game}/>
           ))}
    }

    return (
        <>
            <h1>Profile</h1>
            <p>Name: {currentUser.name}</p>
            <p>Username: {currentUser.username}</p>
            <p>Total Score: {currentUser.score}</p>
            <p>Level: {currentUser.level}</p>
            <h1>You are currently playing:</h1>
            <p>Click on a game to finish</p>
            {currentUser.games ? 
            currentUser.games.map((game) => (
                <GameCard key={game.id} {...game}/>
                ))
            :
            console.log("none")}
        </>
    )
}

const msp = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(msp, null)(PlayerCard)