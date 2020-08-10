import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import Wheel from './Wheel'

const QuestionCard = props => {
    let { currentQuestion, currentUser, updateUser, users } = props

    const backToWheel = () => {
        props.history.push('/wheel')
    }

    const selectAnswer = (e) => {
        if (e.target.innerText === currentQuestion.answer) {
            let newScore = currentUser.score + currentQuestion.points
            console.log(newScore)
            fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }, body: JSON.stringify({
                    score: newScore
                })
            }).then(res => res.json())
            .then(updatedUser => {
                console.log("success", updatedUser)
                updateUser(updatedUser)
                props.history.push('/wheel')
                })
        }
        else if (e.target.innerText !== currentQuestion.answer) {
            alert('That is incorrect')
            props.history.push('/wheel')
        }
    }


    console.log(currentQuestion)
    return(
        <>
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
        users: state.users
    }
}

const mdp = dispatch => {
    return {
        updateUser: (updatedUser) => dispatch(action.updateUser(updatedUser))
    }
}

export default connect(msp, mdp)(QuestionCard)