import React, { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard'
import Wheel from './Wheel'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'

const GameContainer = props => {
    // let [questions, setQuestions] = useState([])
    let [gameQuestions, setGameQuestions] = useState([])
    let { currentUser, questions, currentGame, handleNewGame, handleQuestions } = props
    
    useEffect(() => {
        fetch('http://localhost:3000/questions')
        .then(res => res.json())
        .then(questions => {
            handleQuestions(questions)
        })
    }, [])

    const randomQuestions = questions => {
        let chosenQuestions = []
        let i = 0
        while (i < 20) {
            debugger
        let selectedQuestion = questions[Math.floor(Math.random() * i)]
        chosenQuestions.push(selectedQuestion)
        i++
        }
        setGameQuestions(chosenQuestions)
        console.log(chosenQuestions)
    }

    const createNewGame = (questions, currentUser) => {
        fetch('http://localhost:3000/games', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, body: JSON.stringify( {
                users: [currentUser],
                questions: gameQuestions
            } )
        }).then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
        console.log(questions)
        return(
            <div>
                <h1>This is the Game Container</h1>
                <button onClick={() => randomQuestions()}>New Game</button>
                <QuestionCard />
                <Wheel />
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
        handleQuestions: (questions) => dispatch(action.handleQuestions(questions))
    }
}


export default connect(msp, mdp)(GameContainer)