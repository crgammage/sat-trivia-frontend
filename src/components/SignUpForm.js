import React, { useState, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Link, withRouter } from 'react-router-dom'

class SignUpForm extends React.Component {
    state = {
        name: '',
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState( { [e.target.name]: e.target.value } )
    }

    handleSubmit = e => {
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(newUser => {
            this.props.handleNewUser(newUser)
            this.setState({
                name: '',
                username: '',
                password: ''
            })
        })
        this.props.history.push('/home')
    }
    
    render() {
        return(
            <>
            <h1>Sign Up</h1>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input onChange={(e) => this.handleChange(e)} name="name" type="text" placeholder="Name" value={this.state.name}/>
                <input onChange={(e) => this.handleChange(e)} name="username" type="text" placeholder="Username" value={this.state.username}/>
                <input onChange={(e) => this.handleChange(e)} name="password" type="password" placeholder="Password" value={this.state.password}/>
                <button type="submit">Submit</button>
            </form>
            <p>Already have an account? <Link to="/login" onClick={() => this.props.alreadySignedUp()}>Login</Link></p>
            </>
        )
    }
}

export default withRouter(SignUpForm)