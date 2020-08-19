import React, { useState, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'

const SignUpForm = props => {
    let [name, setName] = useState('')
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let { setToken, handleNewUser, handleLogin } = props

    const handleSubmit = e => {
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name,
                username,
                password
            })
        })
        .then(res => res.json())
        .then(resp => {
            handleNewUser(resp.user)
            handleLogin(resp.user)
            setToken(resp.token)
            localStorage.token = resp.token
            })
        props.history.push('/home')
    }
    
        return(
            <div className="login">
            <h1>Sign Up</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="Name" value={name}/>
                <input onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="Username" value={username}/>
                <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Password" value={password}/>
                <button type="Submit" className="myButton">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        )
    
}

const mdp = dispatch => {
    return {
        handleNewUser: (newUser) => dispatch(action.handleNewUser(newUser)),
        handleLogin: (user) => dispatch(action.handleLogin(user)),
        setToken: (token) => dispatch(action.setToken(token))
    }
}

export default withRouter(connect(null, mdp)(SignUpForm))