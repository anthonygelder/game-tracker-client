import React, {Component} from 'react'
import './Game.css'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  // cardClick() {
  //   console.log('hello')
  //   this.props.selectGame()
  // }

  render() {
    console.log(this.props)
    const { game } = this.props
    const date = game.released.slice(0,-6)
    return (
      <>
        <div className="cardContainer" onClick={() => {this.props.selectGame(game)}}>
            <div className='card'>
                <img src={game.background_image} alt={'game'} className='cardImg' />
            </div>
            <h6><b>{game.name}</b></h6>
            <p>{date}</p>
        </div>
      </>
    );
  }
}

export default Game;