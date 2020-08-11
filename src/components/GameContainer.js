import React, { useState } from 'react'
import QuestionCard from './QuestionCard'
import Wheel from './Wheel'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as action from '../Reducers/actions'

const GameContainer = props => {
    let [gameQuestions, setGameQuestions] = useState([])
    let { currentUser, currentGame, handleNewGame, questions} = props
    
    const randomQuestions = () => {
        let questionsArray = questions
        let chosenQuestions = []
        let i = 0
        while (i < 20) {
        let selectedQuestion = questionsArray[Math.floor(Math.random() * 20)]
        chosenQuestions.push(selectedQuestion)
        i++
        }
        createNewGame(chosenQuestions)
    }

    const createNewGame = (chosenQuestions) => {
        fetch('http://localhost:3000/games', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, body: JSON.stringify( {
                users: [currentUser],
                questions: chosenQuestions
            } )
        }).then(res => res.json())
        .then(newGame => {
            handleNewGame(newGame)
        }).catch(error => {
            console.log(error)
        })
        props.history.push('/wheel')
    }

        return(
            <div>
                <h1>Want to start a new game?</h1>
                <button onClick={() => randomQuestions()}>New Game</button>
            </div>
        )
}

const msp = state => {
    return {
        currentGame: state.currentGame,
        currentUser: state.currentUser,
        questions: state.questions
    }
}

const mdp = dispatch => {
    return {
        handleNewGame: (newGame) => dispatch(action.handleNewGame(newGame)),
    }
}


export default withRouter(connect(msp, mdp)(GameContainer))