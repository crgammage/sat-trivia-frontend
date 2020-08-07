import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState( { [e.target.name]: e.target.value } )
    }

    render() {
        return(
            <>
            <h1>Login</h1>
            <form onSubmit={(e) => this.props.handleLogin(e, this.state)}>
                <input onChange={(e) => this.handleChange(e)} name="username" type="text" placeholder="Username" value={this.state.username}/>
                <input onChange={(e) => this.handleChange(e)} name="password" type="password" placeholder="Password" value={this.state.password}/>
                <button type="submit">Submit</button>
            </form>
            <p>Don't have an account? <Link to="/">Sign Up</Link></p>
            </>
        )
    }
}

export default LoginForm