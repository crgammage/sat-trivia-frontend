import React from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import { withRouter } from "react-router"

const LogOutForm = props => {
    let { handleLogOut } = props

    const logOutClick = () => {
        handleLogOut()
        props.history.push('/')
    }

    return <button onClick={() => logOutClick()}>Logout</button>
    
}

const mdp = dispatch => {
    return {
        handleLogOut: () => dispatch(action.handleLogOut())
    }
}


export default withRouter(connect(null, mdp)(LogOutForm))