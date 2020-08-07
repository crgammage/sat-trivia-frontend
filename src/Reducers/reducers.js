const { Action } = require("history")

const initialState = {
    users: [],
    loggedIn: false,
    currentUser: null
  }


reducer = (prevState=initialState, payload) => {
    switch (action.type) {
        case: 'LOGGED_IN':
            return {...prevState, loggedIn: !prevState.loggedIn}
        case: "FETCH_USERS":
            return {...prevState, users: action.payload.value }

        default:
            return prevState
    }
}

export default Reducer