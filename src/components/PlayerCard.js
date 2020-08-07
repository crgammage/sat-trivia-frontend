import React, { Fragment } from 'react'

function PlayerCard(props) {
    const {name, id, username, score, level } = props.currentUser
    return (
        <>
            <h1>This is the Player Card</h1>
            <p>Name: {name}</p>
            <p>Username: {username}</p>
            <p>Total Score: {score}</p>
            <p>Level: {level}</p>
        </>
    )
}

export default PlayerCard