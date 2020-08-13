import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'

const QuestionCard = props => {
    let { currentGame, handleNewGame, currentQuestion, currentUser, updateUser, updateGames, handleLogin } = props

    const backToWheel = () => {
        props.history.push('/wheel')
    }

    const updateGameTurn = () => {
        let game = currentGame
        fetch(`http://localhost:3000/games/${game.id}`, {
            method: "PATCH",
            headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
            },
            body: JSON.stringify({
                game: {
                    player_1_turn: !game.player_1_turn
                }
            })
        })
        .then(res => res.json())
        .then(updatedGame => {
            console.log(updatedGame)
            updateGames(updatedGame)
            handleNewGame(updatedGame)
        })
    }

    const selectAnswer = (e) => {
        if (e.target.innerText === currentQuestion.answer) {
            let newScore = currentUser.score + currentQuestion.points
            fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }, body: JSON.stringify({
                    score: newScore,
                    password: '',
                    password_confirmation: ''
                })
            }).then(res => res.json())
            .then(updatedUser => {
                console.log("success", updatedUser)
                updateUser(updatedUser)
                handleLogin(updatedUser)
                props.history.push('/wheel')
                })
            updateGameTurn()
        }
        else if (e.target.innerText !== currentQuestion.answer) {
            alert('That is incorrect')
            updateGameTurn()
            props.history.push('/wheel')
        }
    }

    console.log(currentQuestion)
    return(
        <>
        <h4>Score: {currentUser.score}</h4>
        <h1>Question: {currentQuestion.prompt}</h1>
        <p onClick={(e) => selectAnswer(e)}>{currentQuestion.a}</p>
        <p onClick={(e) => selectAnswer(e)}>{currentQuestion.b}</p>
        <p onClick={(e) => selectAnswer(e)}>{currentQuestion.c}</p>
        <p onClick={(e) => selectAnswer(e)}>{currentQuestion.d}</p>
        <button onClick={() => backToWheel()}>Back to Wheel</button>
       </>
    )
}

const msp = state => {
    return {
        currentQuestion: state.currentQuestion,
        currentUser: state.currentUser,
        users: state.users,
        currentGame: state.currentGame
    }
}

const mdp = dispatch => {
    return {
        updateUser: (updatedUser) => dispatch(action.updateUser(updatedUser)),
        handleLogin: (updatedUser) => dispatch(action.handleLogin(updatedUser)),
        handleNewGame: (updatedGame) => dispatch(action.handleNewGame(updatedGame)),
        updateGames: (updatedGame) => dispatch(action.updateGames(updatedGame))
    }
}

export default connect(msp, mdp)(QuestionCard)