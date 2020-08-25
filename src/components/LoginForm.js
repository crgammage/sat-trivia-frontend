import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'
import { withRouter } from "react-router"

const LoginForm = (props) =>  {
    let [ username, setUsername ] = useState('')
    let [ password, setPassword ] = useState('')
    let { handleLogin, setToken } = props

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify( {
                username: username,
                password: password,
            } )
        })
        .then(r => r.json())
        .then(resp => {
            if (resp.message) {
                alert(resp.message)
            } else {
                handleLogin(resp.user)
                setToken(resp.token)
                localStorage.token = resp.token
                props.history.push('/home')
            }
        })
    } 
        
    
        return (
            <div className="login">
            <h1>Login</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="login">
                <input onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="Username" value={username}/>
                <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Password" value={password}/>
                <button type="Submit" className="myButton">Login</button>
            </form>
            <p id="login-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        )
}

const mdp = dispatch => {
    return {
        handleLogin: (user) => dispatch(action.handleLogin(user)),
        setToken: (token) => dispatch(action.setToken(token))
    }
}

export default withRouter(connect(null, mdp)(LoginForm))