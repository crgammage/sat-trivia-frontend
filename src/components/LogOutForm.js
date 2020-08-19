import React from 'react'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import { withRouter } from "react-router"

const LogOutForm = props => {
    let { handleLogOut, setToken } = props

    const logOutClick = () => {
        handleLogOut()
        localStorage.removeItem("token")
        setToken('')
        props.history.push('/')
    }

    return (
            <button className="myButton myButton-1" onClick={() => logOutClick()}>Logout</button>
    )
    
}

const mdp = dispatch => {
    return {
        handleLogOut: () => dispatch(action.handleLogOut()),
        setToken: (token) => dispatch(action.setToken(token))
    }
}


export default withRouter(connect(null, mdp)(LogOutForm))