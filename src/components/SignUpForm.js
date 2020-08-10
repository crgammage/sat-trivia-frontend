import React, { useState, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'

const SignUpForm = props => {
    let [name, setName] = useState('')
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let {  handleNewUser} = props

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
        .then(newUser => {
            handleNewUser(newUser)
            })
        props.history.push('/home')
    }
    
        return(
            <>
            <h1>Sign Up</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="Name" value={name}/>
                <input onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="Username" value={username}/>
                <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Password" value={password}/>
                <button type="submit">Submit</button>
            </form>
            <p>Already have an account? <Link to="/login" onClick={() => this.props.alreadySignedUp()}>Login</Link></p>
            </>
        )
    
}

const mdp = dispatch => {
    return {
        handleNewUser: (newUser) => dispatch(action.handleNewUser(newUser))
    }
}

export default withRouter(connect(null, mdp)(SignUpForm))