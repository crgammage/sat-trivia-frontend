import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from './components/MainContainer'
import Login from './components/Login'

class App extends React.Component {
  state = {
    users: [],
    loggedIn: false
}

handleNewUser = (newUser) => {
    this.setState( { users: [...this.state.users, newUser]})
}

componentDidMount() {
fetch('http://localhost:3000/users')
.then(res => res.json())
.then(data => {
    this.setState({users: data})
})
}
render() {
  return (
    <div>
      {this.state.loggedIn === true ? <MainContainer users={this.state.users}/> : <Login handleNewUser={this.handleNewUser}/>}
    </div>
    
  );
}
}

export default App;
