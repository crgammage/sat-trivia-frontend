import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import MainContainer from './components/MainContainer'
import Login from './components/Login'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from './Reducers/actions'
import GameContainer from './components/GameContainer'
import Wheel from './components/Wheel';
import QuestionCard from './components/QuestionCard';
import { withRouter } from "react-router"
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'


const App = props => {
  let { handleLogin, setToken, fetchGames, fetchUsers, currentUser, fetchQuestions, currentGame, users } = props

  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:3000/users/stay_logged_in", {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(resp => {
        if (resp.message) {
          alert(resp.message)
      } else {
          console.log(resp)
          handleLogin(resp.user)
          setToken(resp.token)
          localStorage.token = resp.token
      }
      })
    }
    fetchUsers()
    fetchQuestions()
    fetchGames()
  }, [])


  console.log(currentUser, currentGame)
    return (
      <>
      <img id="logo" src={require('./images/sat_headergraphic02.png')} alt="Crack the SAT"/>
      <Switch>
        <Route exact path="/home" component={MainContainer}/>
        <Route exact path='/game' component={GameContainer}/>
        <Route exact path='/wheel' component={Wheel}/>
        <Route exact path='/question' component={QuestionCard}/>
        <Route exact path='/signup' component={SignUpForm}/>
        <Route exact path='/login' component={LoginForm}/>
        <Route exact path='/' component={LoginForm}/>
      </Switch>
      </>
    )
}


const msp = state => {
  return {
    users: state.users,
    currentUser: state.currentUser,
    loggedIn: state.loggedIn,
    questions: state.questions,
    currentQuestion: state.currentQuestion,
    completedQuestions: state.completedQuestions,
    currentGame: state.currentGame,
    token: state.token
  }
}

const mdp = dispatch => {
  return {
    fetchUsers: () => dispatch(action.fetchUsers()),
    handleNewUser: (newUser) => dispatch(action.handleNewUser(newUser)),
    fetchQuestions: () => dispatch(action.fetchQuestions()),
    fetchGames: () => dispatch(action.fetchGames()),
    handleLogin: (user) => dispatch(action.handleLogin(user)),
    setToken: (token) => dispatch(action.setToken(token)),
    updateUser: (updatedUser) => dispatch(action.updateUser(updatedUser))
  }
}

export default withRouter(connect(msp, mdp)(App));
