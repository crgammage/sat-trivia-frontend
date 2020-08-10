import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import QuestionCard from './QuestionCard'
import { withRouter } from 'react-router-dom'

const Wheel = props => {
    let { currentUser, currentGame, handleCurrentQuestion } = props
    let [ finishedQuestions, setFinishedQuestions ] = useState([])
    
    const getQuestion = () => {

        
        if (finishedQuestions.length !== 20) {
            let questions = currentGame.questions
            let selectedQuestion = questions[Math.floor(Math.random() * questions.length)]
            handleCurrentQuestion(selectedQuestion)
            setFinishedQuestions([...finishedQuestions, selectedQuestion])
            props.history.push('/question')
        }
        else if (finishedQuestions.length === 20) {
            alert("You're all out of questions!")
        }
    }

    const backButton = () => {
        props.history.push('/home')
    }
    
    console.log(finishedQuestions)
    return (
        <>
        <h1>Wheel</h1>
        <button onClick={() => getQuestion()}>Get Question</button>
        <button onClick={() => backButton()}>Back to Main Menu</button>
        </>
    )
}

const msp = state => {
    return {
        currentGame: state.currentGame,
        currentUser: state.currentUser
    }
}

const mdp = dispatch => {
    return {
        handleCurrentQuestion: (currentQuestion) => dispatch(action.handleCurrentQuestion(currentQuestion))
    }
}

export default withRouter(connect(msp, mdp)(Wheel))