import React, {Component} from 'react'
import './Game.css'
const { API_ENDPOINT } = require('../config')

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.game.status,
      options: ``,
      rating: 1,
      statusFlag: true
    }
  }

  updateGame() {
    const editedStatus = {  status: this.state.status,
                            rating: this.state.rating }
    fetch(`${API_ENDPOINT}/games/${this.props.game.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedStatus),
      headers: {
        'content-type': 'application/json'
      },
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw error
      })
    }
    })
    .then(() => {
      this.clearState()
    })
    .catch(error => {
      console.error(error)
  })
  }

  clearState() {
    this.props.getGames() 
    this.setState({
      status: '',
      options: '',
      statusFlag: true
    })
  }

  changeStatus() {
    this.setState({
      status: this.props.game.status,
      options: this.displaySelect(),
      statusFlag: false
    })
  }

  onStatusChange(status){
    this.setState({status: status})
  }

  onRatingChange(rating){
    this.setState({rating: rating})
  }

  renderRating() {
    return (
      <>
        <select  id='rating' onChange={e => this.onRatingChange(e.target.value)}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <button onClick={() => {this.updateGame()}}>Submit Rating</button>
      </>
      )
  }

  displaySelect() {
    const options = ["Backlog", "Just Started", "In Progress", "Almost Done", "Complete"]
    const { status } = this.props.game
    return (
      <>
        <select id="status" onChange={e => this.onStatusChange(e.target.value)} >
          {options.map(s => {
            if (s === status) {
              return (
                <>
                  <option selected value={s}>{s}</option>
                </>
              )
            } else {
              return (
                <>
                  <option value={s}>{s}</option>
                </>
              )
            }
          })}
        </select>
        <button onClick={() => {this.updateGame()}}>Update</button>
      </>
    )
  }

  render() {
    const { game } = this.props
    if(this.props.saved) {
      return (
        <>
          <div className="cardContainer" >
              <div className='card'>
                  <img src={game.image} alt={'game'} className='cardImg' />
              </div>
              <div>
                <h3><b>{game.game}</b></h3>
                <p>{game.year}</p>
              </div>
              {this.state.statusFlag ? <h6><b onClick={() => {this.changeStatus()}}> {game.status} </b></h6> : null}
              {this.state.options}
              {/* {this.props.rating ? <h6>{this.props.rating}</h6> : ''} */}
              {/* {game.status === "Complete" ? this.renderRating() : ''} */}
              <button onClick={() => {this.props.deleteGame(game.id)}}>
                Delete
              </button>
          </div>
        </>
      );
    } else {
      const date = game.released === null ? 'N/A' : game.released.slice(0,-6)
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