import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import '../App.css'

const QuestionCard = props => {
    let { currentGame, handleNewGame, currentQuestion, currentUser, updateUser, updateGames, handleLogin } = props

    const backToWheel = () => {
        props.history.push('/wheel')
    }

    const updateGameTurn = () => {
        let game = currentGame
        if (game.completedQuestions >= 20) {
            fetch(`http://localhost:3000/games/${game.id}`, {
            method: "PATCH",
            headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
            },
            body: JSON.stringify({
                game: {
                    player_1_turn: !game.player_1_turn,
                    finished: true
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
        else if (game.completedQuestions < 20) {
            fetch(`http://localhost:3000/games/${game.id}`, {
            method: "PATCH",
            headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
            },
            body: JSON.stringify({
                game: {
                    player_1_turn: !game.player_1_turn,
                    completedQuestions: game.completedQuestions + 1
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

    const upperCaseName = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    console.log(currentQuestion)
    let gameUsers = [currentGame.user1s[0], currentGame.user2s[0]]
    let opponent = gameUsers.find(user => user.id !== currentUser.id)
    let opponentName = upperCaseName(opponent.name)
    return(
        <>
        <div>
            <h4 className="scores">Your Score: {currentUser.score}</h4>
            <h4 className="scores">{opponentName}'s Score: {opponent.score}</h4>
            <h1>Question: {currentQuestion.prompt}</h1>
            <h3 className="answer-options" onClick={(e) => selectAnswer(e)}>{currentQuestion.a}</h3>
            <h3 className="answer-options" onClick={(e) => selectAnswer(e)}>{currentQuestion.b}</h3>
            <h3 className="answer-options" onClick={(e) => selectAnswer(e)}>{currentQuestion.c}</h3>
            <h3 className="answer-options" onClick={(e) => selectAnswer(e)}>{currentQuestion.d}</h3>
        </div>
        <div>
            <button className="myButton myButton-2" onClick={() => backToWheel()}>Back to Wheel</button>
        </div>
       </>
    )
}

const msp = state => {
    return {
        currentQuestion: state.currentQuestion,
        currentUser: state.currentUser,
        users: state.users,
        currentGame: state.currentGame,
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