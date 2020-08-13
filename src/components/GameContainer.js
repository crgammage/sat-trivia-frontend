import React, { useState } from 'react'
import QuestionCard from './QuestionCard'
import Wheel from './Wheel'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as action from '../Reducers/actions'

const GameContainer = props => {
    let [ opponent, setOpponent ] = useState('')
    let [ opponentObj, setOpponentObj ] = useState(null)
    let { currentUser, users, handleNewGame, questions, currentGame } = props

    const selectOpponent = () => {
        let selectedOpponent = opponent
        let opponentObject = users.find(user => user.username === selectedOpponent)
        setOpponentObj(opponentObject)
    }
    
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
        let user = currentUser
        let users = [currentUser, opponentObj]
        if (opponentObj === null) {
            fetch('http://localhost:3000/games', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }, body: JSON.stringify( {
                    game: {
                        user1: user,
                        questions: chosenQuestions
                    }
                } )
            }).then(res => res.json())
            .then(newGame => {
                handleNewGame(newGame)
            }).catch(error => {
                console.log(error)
            })
        }
        else if (opponentObj !== null) {
            fetch('http://localhost:3000/games', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }, body: JSON.stringify( {
                    game: {
                        user1s: currentUser,
                        user2s: opponentObj,
                        questions: chosenQuestions
                    }
                } )
            }).then(res => res.json())
            .then(newGame => {
                handleNewGame(newGame)
                console.log(newGame)
            }).catch(error => {
                console.log(error)
            })
        }
        props.history.push('/wheel')
        setOpponentObj(null)
    }
        console.log(currentGame, opponentObj)
        return(
            <div>
                <h1>Want to start a new game?</h1>
                <input onChange={(e) => setOpponent(e.target.value)} name="opponent" type="text" placeholder="Search By Username" value={opponent}/>
                <button onClick={() => selectOpponent()}>Add Opponent</button>
                <button onClick={() => randomQuestions()}>New Game</button>
            </div>
        )
}

const msp = state => {
    return {
        currentGame: state.currentGame,
        currentUser: state.currentUser,
        questions: state.questions,
        users: state.users
    }
}

const mdp = dispatch => {
    return {
        handleNewGame: (newGame) => dispatch(action.handleNewGame(newGame)),
    }
}


export default withRouter(connect(msp, mdp)(GameContainer))