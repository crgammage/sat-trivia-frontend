import React from 'react'
import Login from './Login'
import PlayerContainer from './PlayerContainer'
import ScoreContainer from './ScoreContainer'
import GameContainer from './GameContainer'
import LogOutForm from './LogOutForm'

class MainContainer extends React.Component {
    
    render() {
        console.log(this.state)
        return (
            <div>
                <h1>This is the Main Container</h1>
                <PlayerContainer users={this.props.users} currentUser={this.props.currentUser}/>
                <ScoreContainer />
                <GameContainer currentUser={this.props.currentUser} />
                <LogOutForm handleLogOut={this.props.handleLogOut} />
            </div>
        )
    }
}

export default MainContainer