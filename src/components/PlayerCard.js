import React from 'react'
import { connect } from 'react-redux'
import GameCard from './GameCard.js'
import * as action from '../Reducers/actions'
import LogOutForm from './LogOutForm'
import { withRouter } from 'react-router-dom'

const PlayerCard = props => {
    let { currentUser, handleLogin, updateUser } = props
            

    const currentGames = () => {
        let user = currentUser
        if (user.games) {
            console.log(user.games)
           user.games.map((game) => (
           <GameCard key={game.id} {...game}/>
           ))
        } else {
            return null
        }
    }

    const updateUserLevel = () => {
        if (currentUser && currentUser.score > 100) {
            debugger
          fetch(`http://localhost:3000/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify( {
              level: currentUser.level + 1,
              score: 0
            })
          }).then(r => r.json())
          .then(updatedUser => {
            console.log(updatedUser)
            handleLogin(updatedUser)
            updateUser(updatedUser)
          })
        }
      }

      const reloadPage = () => {
        fetch(`http://localhost:3000/users/${currentUser.id}`)
        .then(r => r.json())
        .then(user => {
            handleLogin(user)
        })
    }

    const renderCurrentGames = () => {
      if (currentUser.games) {
        let ongoingGames = currentUser.games.filter(game => game.finished === false)
        return (ongoingGames.map((game) => (
          <GameCard key={game.id} {...game}/>
          )))
      }
    }
    
    return (
      <>
        <div id="current-player-info">
        {updateUserLevel()}
              <h1>Your Profile</h1>
                <p>Name: {currentUser.name}</p>
                <p>Username: {currentUser.username}</p>
                <p>Total Score: {currentUser.score}</p>
                <p>Level: {currentUser.level}</p>
                <LogOutForm />
              </div>
            <div className="game-cards-title">
                <h1>You are currently playing:</h1>
                <p>Click on a game to finish</p>
                <button className="myButton myButton-1" id="get-games" onClick={() => reloadPage()}>Get Games</button>
              {renderCurrentGames()}
            </div>
      </>
    )
}

const msp = state => {
    return {
        currentUser: state.currentUser
    }
}

const mdp = dispatch => {
    return {
        handleLogin: (user) => dispatch(action.handleLogin(user)),
        updateUser: (updatedUser) => dispatch(action.updateUser(updatedUser))
    }
}

export default withRouter(connect(msp, mdp)(PlayerCard))