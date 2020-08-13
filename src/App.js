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


const App = props => {
  let { fetchGames, fetchUsers, currentUser, fetchQuestions, currentGame, users } = props

  useEffect(() => {
    fetchUsers()
    fetchQuestions()
    fetchGames()
  }, [])

  console.log(users, currentUser, currentGame)
    return (
      <>
      <Switch>
        <Route exact path="/home" component={MainContainer}/>
        <Route exact path="/" component={Login}/>
        <Route exact path='/game' component={GameContainer}/>
        <Route exact path='/wheel' component={Wheel}/>
        <Route exact path='/question' component={QuestionCard}/>
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
    currentGame: state.currentGame
  }
}

const mdp = dispatch => {
  return {
    fetchUsers: () => dispatch(action.fetchUsers()),
    handleNewUser: (newUser) => dispatch(action.handleNewUser(newUser)),
    fetchQuestions: () => dispatch(action.fetchQuestions()),
    fetchGames: () => dispatch(action.fetchGames())
  }
}

export default connect(msp, mdp)(App);
