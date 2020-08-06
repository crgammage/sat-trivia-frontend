import React from 'react'
import Login from './Login'
import PlayerContainer from './PlayerContainer'
import ScoreContainer from './ScoreContainer'
import GameContainer from './GameContainer'

class MainContainer extends React.Component {

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>This is the Main Container</h1>
                <PlayerContainer />
                <ScoreContainer />
                <GameContainer />
            </div>
        )
    }
}

export default MainContainer