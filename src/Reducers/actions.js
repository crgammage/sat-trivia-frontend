let handleLogin = (user) => ({type: 'LOGIN', payload: { value: user }})
let renderUsers = (users) => ({type: 'RENDER_USERS', payload: { value: users }})
let handleNewUser = (newUser) => ({type: 'NEW_USER', payload: { value: newUser }})
let handleLogOut = () => ({type: 'LOGOUT'})
let handleNewGame = (newGame) => ({type: 'NEW_GAME', payload: {value: newGame}})
let handleQuestions = (questions) => ({type: 'QUESTIONS', payload: {value: questions}})

export {
    handleLogin,
    renderUsers,
    handleNewUser,
    handleLogOut,
    handleNewGame,
    handleQuestions
}