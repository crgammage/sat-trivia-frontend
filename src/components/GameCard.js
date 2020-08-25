import React from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import { withRouter } from "react-router"


const GameCard = props => {
    let { games, handleNewGame, currentUser } = props

    const resumeGame = () => {
        let id = props.id
        let resumedGame = games.find(game => game.id == id)
        handleNewGame(resumedGame)
        props.history.push('/wheel')
    }

    const currentUsersGames = () => {
        let gamesArr = games
        if (currentUser && currentUser.games) {
        let selectedGame = gamesArr.find(game => game.id === props.id)
        let users = [selectedGame.user1s[0], selectedGame.user2s[0]]
        debugger
        let opponent = users.find(user => user.id !== currentUser.id)
        let time = new Date(props.updated_at)
        let timeString = time.toDateString()
        let questionsLeft = 20 - selectedGame.completedQuestions
        return (
            <>
                <h3 onClick={() => resumeGame()}>Opponent: {opponent.name}</h3>
                <h3 onClick={() => resumeGame()}>Last Updated: {timeString}</h3>
                <h3 onClick={() => resumeGame()}>Questions Remaining: {questionsLeft}</h3>
            </>
        )
        }
        else {
            console.log('no games')
        }
    }

    return(
        <>
        <h3>꘎♡━━━━━━━━━━━━━━━♡꘎</h3>
        <div className="game-cards">
        {props.finished ? null :
                <h3 onClick={() => resumeGame()}>Game: {props.id}</h3>
        }
        {currentUsersGames()}
        </div>
       </>
    )
}

const msp = state => {
    return {
        games: state.games,
        currentUser: state.currentUser
    }
}

const mdp = dispatch => {
    return {
        handleNewGame: (game) => dispatch(action.handleNewGame(game))
    }
}

export default withRouter(connect(msp, mdp)(GameCard))