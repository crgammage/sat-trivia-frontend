import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import { withRouter } from "react-router"

const LoginForm = (props) =>  {
    let [ username, setUsername ] = useState('')
    let [ password, setPassword ] = useState('')
    let { handleLogin, users } = props

    const handleSubmit = e => {
        e.preventDefault()
        let currentUser = users.find(user => user.username === username)
        handleLogin(currentUser)
        props.history.push('/home')
    }  

        return (
            <>
            <h1>Login</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="Username" value={username}/>
                <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Password" value={password}/>
                <button type="submit">Submit</button>
            </form>
            <p>Don't have an account? <Link to="/">Sign Up</Link></p>
            </>
        )
}

const msp = state => {
    return {
        users: state.users
    }
}

const mdp = dispatch => {
    return {
        handleLogin: (user) => dispatch(action.handleLogin(user))
    }
}

export default withRouter(connect(msp, mdp)(LoginForm))