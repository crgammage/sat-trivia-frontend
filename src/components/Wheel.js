import React from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import { withRouter } from 'react-router-dom'

const Wheel = props => {
    let { currentGame,
        handleNewGame,
        updateGames,
        currentUser,
        handleCurrentQuestion } = props
    

    const getQuestion = () => {
        if (currentGame.completedQuestions < 20) {
            let questions = currentGame.questions
            let selectedQuestion = questions[Math.floor(Math.random() * questions.length)]
            handleCurrentQuestion(selectedQuestion)
            props.history.push('/question')
        }
        else if (currentGame.completedQuestions >= 20) {
            alert('You have completed the game')
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


const upperCaseName = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

    const flipUser = () => {
        if (currentGame.user1s) {
            let gameUsers = [currentGame.user1s[0], currentGame.user2s[0]]
            let opponent = gameUsers.find(user => user.id !== currentUser.id)
            let opponentName = upperCaseName(opponent.name)
            if (currentUser.id === currentGame.user1s[0].id && currentGame.player_1_turn) {
                return (
                    <div className="wheel">
                        <h3 className="scores">Your Score: {currentUser.score}</h3>
                        <h3 className="scores">{opponentName}'s Score: {opponent.score}</h3>
                            <img src={require('../images/challengebutton.png')} onClick={() => getQuestion()} alt="Click Here for your next Question"></img>
                            <button className="myButton myButton-3" onClick={() => backButton()}>Back to Main Menu</button><br/>
                    </div>
                )
            }
            else if (currentUser.id === currentGame.user2s[0].id && !currentGame.player_1_turn) {
                return (
                    <div className="wheel">
                        <h3 className="scores">Your Score: {currentUser.score}</h3>
                        <h3 className="scores">{opponentName}'s Score: {opponent.score}</h3>
                        <div className="wheel-buttons">
                            <img src={require('../images/challengebutton.png')} onClick={() => getQuestion()} alt="Click Here for your next Question"></img>
                            <button className="myButton myButton-3" onClick={() => backButton()}>Back to Main Menu</button><br/>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="wheel">
                        <h3 className="scores">Your Score: {currentUser.score}</h3>
                        <h3 className="scores">{opponentName}'s Score: {opponent.score}</h3>
                        <h2>It's {opponentName}'s Turn</h2>
                        <p>Please click below to check if it is your turn.</p>
                        <div className="wheel-buttons">
                            <button className="myButton myButton-2" onClick={() => reloadGame()}>Reload</button><br/>
                            <button className="myButton myButton-2" onClick={() => backButton()}>Back to Main Menu</button><br/>
                        </div>
                    </div>
                )
            }
        }
    }

    return (
        <div>
            {flipUser()}
        </div>
        
    )
}

const msp = state => {
    return {
        currentGame: state.currentGame,
        currentUser: state.currentUser,
        currentQuestion: state.currentQuestion,
    }
}

const mdp = dispatch => {
    return {
        handleCurrentQuestion: (currentQuestion) => dispatch(action.handleCurrentQuestion(currentQuestion)),
        handleNewGame: (updatedGame) => dispatch(action.handleNewGame(updatedGame)),
        updateGames: (updatedGame) => dispatch(action.updateGames(updatedGame))
    }
}

export default withRouter(connect(msp, mdp)(Wheel))