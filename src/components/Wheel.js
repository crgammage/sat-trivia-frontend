import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import QuestionCard from './QuestionCard'
import { withRouter } from 'react-router-dom'

const Wheel = props => {
    let { currentGame, handleNewGame, updateGames, currentUser, handleCurrentQuestion, questionCompleted, completedQuestions, resetCompletedQuestions} = props
    
    const beginGame = () => {
        let game = currentGame
        if (game.player_1_turn === true) {
            getQuestion()
            }
         else if (game.player_1_turn === false) {
            alert("It is your opponent's turn. Please reload the page until they have completed their turn.")
        }
    }


    const getQuestion = () => {
        if (completedQuestions < 20) {
            let questions = currentGame.questions
            let selectedQuestion = questions[Math.floor(Math.random() * questions.length)]
            handleCurrentQuestion(selectedQuestion)
            questionCompleted()
            props.history.push('/question')
        }
        else if (completedQuestions === 20) {
            alert('You have completed the game')
            resetCompletedQuestions()
            finishGame()
            props.history.push('/home')
        }    
    }

    const finishGame = () => {
        let game = currentGame
         fetch(`http://localhost:3000/games/${game.id}`, {
             method: "PATCH",
             headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json"
             },
             body: JSON.stringify({
                 game: {
                     finished: true
                 }
             })
         }).then(res => res.json())
         .then(updatedGame => {
            updateGames(updatedGame)
            handleNewGame({})
         })
    }

    const backButton = () => {
        props.history.push('/home')
    }

    const reloadGame = () => {
        fetch(`http://localhost:3000/games/${currentGame.id}`)
        .then(res => res.json())
        .then(updatedGame => {
            updateGames(updatedGame)
            handleNewGame(updatedGame)
            console.log(updatedGame)
        })
    }

    return (
        <>
        <h4>Score: {currentUser.score}</h4>
        <h1>Wheel</h1>
        <button onClick={() => beginGame()}>Get Question</button>
        <button onClick={() => backButton()}>Back to Main Menu</button>
        <button onClick={() => reloadGame()}>Reload</button>
        </>
    )
}

const msp = state => {
    return {
        currentGame: state.currentGame,
        currentUser: state.currentUser,
        currentQuestion: state.currentQuestion,
        completedQuestions: state.completedQuestions
    }
}

const mdp = dispatch => {
    return {
        handleCurrentQuestion: (currentQuestion) => dispatch(action.handleCurrentQuestion(currentQuestion)),
        questionCompleted: () => dispatch(action.questionCompleted()),
        resetCompletedQuestions: () => dispatch(action.resetCompletedQuestions()),
        handleNewGame: (updatedGame) => dispatch(action.handleNewGame(updatedGame)),
        updateGames: (updatedGame) => dispatch(action.updateGames(updatedGame))
    }
}

export default withRouter(connect(msp, mdp)(Wheel))