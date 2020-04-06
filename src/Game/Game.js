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
        <div className='card'>
            <img src={game.background_image} alt={'game'}   />
            <div class="container">
                <h4><b>{game.name}</b></h4>
                <p>{game.released}</p>
            </div>
        </div>
      </>
    );
  }
}

export default Game;