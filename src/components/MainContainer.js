import React from 'react'
import PlayerContainer from './PlayerContainer'
import ScoreContainer from './ScoreContainer'
import GameContainer from './GameContainer'
import LogOutForm from './LogOutForm'
import { connect } from 'react-redux'

class MainContainer extends React.Component {
    
    render() {
        let { users, currentUser } = this.props
        return (
            <div>
                <PlayerContainer users={users} currentUser={currentUser}/>
                <ScoreContainer />
                <GameContainer currentUser={currentUser} />
                <LogOutForm handleLogOut={this.props.handleLogOut} />
            </div>
        )
    }
}

const msp = state => {
    return {
        users: state.users,
        currentUser: state.currentUser
    }
}

export default connect(msp, null)(MainContainer)