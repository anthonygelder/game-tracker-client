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


    if(this.props.saved) {
      return (
        <>
          <div className="cardContainer" >
              <div className='card'>
                  <img src={game.image} alt={'game'} className='cardImg' />
              </div>
              <h6><b>{game.game}</b></h6>
              <h6><b>{game.status}</b></h6>
              <p>{game.year}</p>
          </div>
        </>
      );
    } else {
      let date
      if (game.released === null) {
        date = 'N/A'
      } else {
        date = game.released.slice(0,-6)
      }
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
      )
    }
  }
}

export default Game;