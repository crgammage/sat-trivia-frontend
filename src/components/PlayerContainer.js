import React, {useEffect} from 'react'
import PlayerCard from './PlayerCard.js'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'

const PlayerContainer = props => {
    let {currentUser} = props

    console.log(currentUser)
    return (
        <div>
            <PlayerCard />
        </div>
        
    )
}

const msp = state => {
    return {
        currentUser: state.currentUser
    }
}

const mdp = dispatch => {
    return {
        handleLogin: (updatedUser) => dispatch(action.handleLogin(updatedUser))
    }
}

export default connect(msp, mdp)(PlayerContainer)