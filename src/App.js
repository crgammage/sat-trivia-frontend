import React, { useState, useEffect, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from './components/MainContainer'
import Login from './components/Login'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import reducer from './Reducers/reducers';

const App = props => {
  
  useEffect(() => {
    fetch('http://localhost:3000/users')
    .then(r => r.json())
    .then(data => {
      reducer('FETCH_USERS', payload: {value: data})
    })
  })

handleNewUser = (newUser) => {
    this.setState( { users: [...this.state.users, newUser]})
    this.setState( { currentUser: newUser })
}

componentDidMount() {
fetch('http://localhost:3000/users')
.then(res => res.json())
.then(data => {
    this.setState({users: data})
})
}

handleLogin = (event, currentUser) => {
  event.preventDefault()
  this.setState( { loggedIn: !this.state.loggedIn })
  let nowUser = this.state.users.find(user => user.username === currentUser.username)
  this.setState({ currentUser: nowUser })
}

handleLogOut = (event) => {
  event.preventDefault()
  this.setState( { loggedIn: !this.state.loggedIn, currentUser: null } )
  this.props.history.push('/')
}

  console.log(this.state)
    return (
      <>
        {this.state.loggedIn ? <MainContainer handleLogOut={this.handleLogOut} users={this.state.users} currentUser={this.state.currentUser} /> : 
        <Login
         users={this.state.users}
         handleNewUser={this.handleNewUser} 
         handleLogin={this.handleLogin} /> }
      </>
    );
  }

  const mapStateToProps = state => {
    return {
      loggedIn: state.loggedIn,
      users: state.users,
      currentUser: state.currentUser
    }
  }

  const mapDispatchToProps = state => {
    return {
      loggedIn: () => dispatch({type: 'LOGGED_IN'}),
      users: (data) => dispatch({type: 'GET_USERS', payload: {value: data}),
      currentUser: () => dispatch({type: 'CURRENT_USER', payload: {value: user}})
    }
  }
}

export default connect()(App);
