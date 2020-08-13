import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import { withRouter } from "react-router"


const GameCard = props => {
    let { games, handleNewGame, completedQuestions, currentUser } = props

    const resumeGame = () => {
        let id = props.id
        let resumedGame = games.find(game => game.id == id)
        handleNewGame(resumedGame)
        props.history.push('/wheel')
    }

    const currentUsersGames = () => {
        let gamesArr = games
        if (currentUser.games) {
        let selectedGame = gamesArr.find(game => game.id === props.id)
        let users = [selectedGame.user1s[0], selectedGame.user2s[0]]
        let opponent = users.find(user => user.id !== currentUser.id)
        let time = new Date(props.updated_at)
        let timeString = time.toDateString()
        return (
            <>
            <h3>Opponent: {opponent.name}</h3>
            <h3>Last Updated: {timeString}</h3>
            </>
        )
        }
        else {
            return null
        }
        
    }

    console.log(completedQuestions)
    return(
        <>
        {props.finished ? null :
            <>
                <h3 onClick={() => resumeGame()}>Game: </h3>
            </>
        }
        {currentUsersGames()}
       </>
    )
}

const msp = state => {
    return {
        games: state.games,
        completedQuestions: state.completedQuestions,
        currentUser: state.currentUser
    }
}

const mdp = dispatch => {
    return {
        handleNewGame: (game) => dispatch(action.handleNewGame(game))
    }
}

export default withRouter(connect(msp, mdp)(GameCard))