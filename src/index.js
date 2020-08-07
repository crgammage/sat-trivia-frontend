import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import MainContainer from './components/MainContainer'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import reducer from './Reducers/reducers.js'

const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <Router>
    <Route exact path="/" component={App}/>
    <Route exact path="/login" component={LoginForm}/>
    <Route exact path="/home" component={MainContainer}/>
  </Router>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
