import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import QuestionCard from './QuestionCard'
import { withRouter } from 'react-router-dom'

const Wheel = props => {
    let { currentGame, currentUser, handleCurrentQuestion, questionCompleted, completedQuestions, resetCompletedQuestions} = props
    
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
            props.history.push('/home')
        }
            
    }


    const backButton = () => {
        props.history.push('/home')
    }

    
    return (
        <>
        <h4>Score: {currentUser.score}</h4>
        <h1>Wheel</h1>
        <button onClick={() => getQuestion()}>Get Question</button>
        <button onClick={() => backButton()}>Back to Main Menu</button>
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
        resetCompletedQuestions: () => dispatch(action.resetCompletedQuestions())
    }
}

export default withRouter(connect(msp, mdp)(Wheel))