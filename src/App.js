import React, { useState, useEffect, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from './components/MainContainer'
import Login from './components/Login'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from './Reducers/actions'
import LoginForm from './components/LoginForm'

const App = props => {
  let { renderUsers, handleLogin, users, currentUser, loggedIn, handleQuestions } = props

  useEffect(() => {
    fetch('http://localhost:3000/users')
    .then(r => r.json())
    .then(data => {
      renderUsers(data)
    })
  }, [])

console.log(props.currentUser)
    return (
      <>
      <Switch>
        <Route exact path="/home" component={MainContainer}/>
        <Route exact path="/" component={Login}/>
      </Switch>
      </>
    );
}

const msp = state => {
  return {
    users: state.users,
    currentUser: state.currentUser,
    loggedIn: state.loggedIn
  }
}

const mdp = dispatch => {
  return {
    renderUsers: (users) => dispatch(action.renderUsers(users)),
    handleNewUser: (newUser) => dispatch(action.handleNewUser(newUser))
    
  }
}

export default connect(msp, mdp)(App);
