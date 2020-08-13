import React from 'react'
import PlayerContainer from './PlayerContainer'
import ScoreContainer from './ScoreContainer'
import GameContainer from './GameContainer'
import LogOutForm from './LogOutForm'
import { connect } from 'react-redux'

const MainContainer = props => {
    
        return (
            <div>
                <PlayerContainer />
                <ScoreContainer />
                <GameContainer  />
                <LogOutForm />
            </div>
        )
}

const msp = state => {
    return {
        users: state.users,
        currentUser: state.currentUser
    }
}

export default connect(msp, null)(MainContainer)