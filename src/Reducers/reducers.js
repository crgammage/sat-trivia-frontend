const { Action } = require("history")

const initialState = {
    users: [],
    loggedIn: false,
    currentUser: {},
    currentGame: {},
    questions: {}
  }


const reducer = (prevState=initialState, action) => {
    switch (action.type) {
        case 'RENDER_USERS':
            return {...prevState, users: action.payload.value}
        case 'NEW_USER':
            return {...prevState, users: [...prevState.users, action.payload.value]}
        case 'LOGIN':
            return {...prevState, loggedIn: true, currentUser: action.payload.value}
        case 'LOGOUT':
            return {...prevState, loggedIn: false, currentUser: {}}
        case 'NEW_GAME':
            return {...prevState, currentGame: action.payload.value}
        case 'QUESTIONS':
            return {...prevState, questions: action.payload.value}
        default:
            return prevState
    }
}

// handleLogin = (event, currentUser) => {
//     event.preventDefault()
//     this.setState( { loggedIn: !this.state.loggedIn })
//     let nowUser = this.state.users.find(user => user.username === currentUser.username)
//     this.setState({ currentUser: nowUser })
//   }

export default reducer