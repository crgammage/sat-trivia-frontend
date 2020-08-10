import React, { Fragment } from 'react'
import { connect } from 'react-redux'

const PlayerCard = props => {
    let { currentUser } = props
    return (
        <>
            <h1>Profile</h1>
            <p>Name: {currentUser.name}</p>
            <p>Username: {currentUser.username}</p>
            <p>Total Score: {currentUser.score}</p>
            <p>Level: {currentUser.level}</p>
        </>
    )
}

const msp = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(msp, null)(PlayerCard)