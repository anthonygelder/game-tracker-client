import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import TokenService from '../services/token-service'
import Game from '../Game/Game'
import './GameList.css'
const { API_ENDPOINT } = require('../config')

class GameList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }

  removeGame = (gameId) => {
    const newGames = this.state.games.filter(game => game.id === gameId)
    this.setState({
      games: newGames
    })
  }
  
  deleteGame(gameId) {
    fetch(`${API_ENDPOINT}/games/${gameId}`, {
      method: 'DELETE',
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
      this.removeGame(gameId)
    })
    .catch(error => {
      console.error(error)
    })
  }
  

  getGames() {
    fetch(`${API_ENDPOINT}/games`, {
      method: 'GET',
      headers: {
        'authorization': `basic ${TokenService.getAuthToken()}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          games: data
        })
      })
  }

  componentDidMount() {
    this.getGames()
  }

  renderGames() {
    const { games } = this.state
    if (games.length === 0) {
      return null
    } else {
      return (
        <>
          {games.map((item) => <Game game={item} key={item.id} saved={"saved"} routeProps={this.props.routeProps} getGames={(gameId) => this.getGames()} deleteGame={(gameId) => this.deleteGame(gameId) }/>)}
        </>
      )
    }
  }

  render() {
    return (
      <>
        <h1>Game List</h1>
        <Link to='/addGame'>Add Game</Link>
        <div className="games">
          {this.renderGames()}
        </div>
      </>
    );
  }
}

export default GameList;