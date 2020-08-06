import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

function Login(props) {
    let [loggedIn, setLoggedIn] = useState(false)

        return (
            <div>
                {loggedIn ? <LoginForm onClick={() => setLoggedIn(!loggedIn)}/> : <SignUpForm handleNewUser={props.handleNewUser}/>}
            </div>
        )
}

export default Login