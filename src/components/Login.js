import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import { connect } from 'redux' 

class Login extends React.Component{

    render() {
        return (
            <div>
                <LoginForm 
                users={this.props.users} 
                handleLogin={this.props.handleLogin} 
                /> : 
                <SignUpForm 
                alreadySignedUp={this.alreadySignedUp}
                handleNewUser={this.props.handleNewUser}
                />
            </div>
        )
    }
    
}

export default connect()(Login)