const QUESTIONS_API = 'http://localhost:3000/questions'
const USERS_API = 'http://localhost:3000/users'
let handleLogin = (user) => ({type: 'LOGIN', payload: { value: user }})
let handleNewUser = (newUser) => ({type: 'NEW_USER', payload: { value: newUser }})
let handleLogOut = () => ({type: 'LOGOUT'})
let handleNewGame = (newGame) => ({type: 'NEW_GAME', payload: {value: newGame}})
let handleCurrentQuestion = (currentQuestion) => ({type: 'NEXT_QUESTION', payload: {value: currentQuestion}})
let questionCompleted = () => ({type: 'COMPLETED_QUESTIONS'})
let resetCompletedQuestions = () => ({type: 'RESET_COMPLETED_QUESTIONS'})
let fetchUsers = () => dispatch => {
    fetch(USERS_API).then(r => r.json())
        .then(users => dispatch({type: 'FETCH_USERS', payload: {value: users} }))
}
let fetchQuestions = () => dispatch => {
    fetch(QUESTIONS_API).then(r => r.json())
        .then(questions => dispatch({type: 'FETCH_QUESTIONS', payload: {value: questions} }))
}
let updateUser = (updatedUser) => ({ type: 'UPDATE_USER', payload: {value: updatedUser}})

export {
    handleLogin,
    fetchUsers,
    handleNewUser,
    handleLogOut,
    handleNewGame,
    fetchQuestions,
    handleCurrentQuestion,
    updateUser,
    questionCompleted,
    resetCompletedQuestions
}