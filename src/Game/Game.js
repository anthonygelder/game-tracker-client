import React, {Component} from 'react'
import './Game.css'
const { API_ENDPOINT } = require('../config')

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '',
      options:``,
      statusFlag: true
    }
  }

  updateGame() {
    const editedStatus = { status: this.state.status }
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

  onStatusChanged(status){
    this.setState({status: status})
  }

  displaySelect() {
    const options = ["Backlog", "Just Started", "In Progress", "Almost Done", "Complete"]
    const { status } = this.props.game
    return (
      <>
        <select id="status" onChange={e => this.onStatusChanged(e.target.value)} >
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
              <h6><b>{game.game}</b></h6>
              {this.state.statusFlag ? <h6><b onClick={() => {this.changeStatus()}}> {game.status} </b></h6> : null}
              {this.state.options}
              <p>{game.year}</p>
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