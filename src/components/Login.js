import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import * as action from '../Reducers/actions'

const Login = (props) => {
    let { handleLogin, users, currentUser, handleNewUser } = props
        return (
            <div>
                <LoginForm 
                /> : 
                <SignUpForm 
                handleNewUser={handleNewUser}
                />
            </div>
        )
    }
     const msp = state => {
         return {
            users: state.users,
            loggedIn: state.loggedIn,
            currentUser: state.currentUSer
     }
    }

     const mdp = dispatch => {
        return {
            handleLogin: (currentUser) => dispatch(action.handleLogin(currentUser))
        }
     }

export default connect(msp, mdp)(Login)