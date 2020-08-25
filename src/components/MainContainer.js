import React from 'react'
import PlayerContainer from './PlayerContainer'
import GameContainer from './GameContainer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const MainContainer = props => {
    let { currentUser } = props

    
    return(
        <div>
            <PlayerContainer />
            <GameContainer /> 
        </div>
    )
            
}

const msp = state => {
    return {
        users: state.users,
        currentUser: state.currentUser
    }
}

export default withRouter(connect(msp, null)(MainContainer))