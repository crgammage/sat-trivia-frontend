const { Action } = require("history")

const initialState = {
    users: [],
    loggedIn: false,
    currentUser: {},
    currentGame: {},
    questions: [],
    currentQuestion: {},
    completedQuestions: 0,
    games: [],
    token: ''
  }


const reducer = (prevState=initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return {...prevState, users: action.payload.value}
        case 'NEW_USER':
            return {...prevState, loggedIn: true, currentUser: action.payload.value, users: [...prevState.users, action.payload.value]}
        case 'LOGIN':
            return {...prevState, loggedIn: true, currentUser: action.payload.value}
        case 'LOGOUT':
            return {...prevState, loggedIn: false, currentUser: {}}
        case 'NEW_GAME':
            return {...prevState, currentGame: action.payload.value}
        case 'FETCH_QUESTIONS':
            return {...prevState, questions: action.payload.value}
        case 'FETCH_GAMES':
            return {...prevState, games: action.payload.value}
        case 'NEXT_QUESTION':
            return {...prevState, currentQuestion: action.payload.value}
        case 'UPDATE_USER':
            let updatedUser = action.payload.value
            let newUsersArr = prevState.users.map(user => user.id === updatedUser.id ? updatedUser : user)
            return {...prevState, users: newUsersArr}
        case 'UPDATE_GAMES':
            let updatedGame = action.payload.value
            let newGamesArr = prevState.games.map(game => game.id === updatedGame.id ? updatedGame : game)
            return {...prevState, games: newGamesArr}
        case 'COMPLETED_QUESTIONS':
            return {...prevState, completedQuestions: prevState.completedQuestions + 1}
        case 'RESET_COMPLETED_QUESTIONS':
            return {...prevState, completedQuestions: 0}
        case 'SET_TOKEN':
            return {...prevState, token: action.payload.value}
        default:
            return prevState
    }
}


export default reducer