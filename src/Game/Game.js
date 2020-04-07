import React, {Component} from 'react'
import './Game.css'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    console.log(this.props)
    const { game } = this.props
    return (
      <>
        <div class="container">
            <div className='card'>
                <img src={game.background_image} alt={'game'} className='cardImg' />
            </div>
            <h6><b>{game.name}</b></h6>
            <p>{game.released}</p>
        </div>
      </>
    );
  }
}

export default Game;