import React from 'react'
import QuestionCard from './QuestionCard'
import Wheel from './Wheel'

class GameContainer extends React.Component {
    state = {
        questions: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/questions')
        .then(res => res.json())
        .then(data => {
            this.setState({questions: data})
        })
    }

    createNewGame = () => {
        fetch('http://localhost:3000/games', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, body: JSON.stringify( {} )
        })
    }


    render() {
        console.log(this.state)
        return(
            <div>
                <h1>This is the Game Container</h1>
                <button >New Game</button>
                <QuestionCard />
                <Wheel />
            </div>
        )
    } 
}

export default GameContainer