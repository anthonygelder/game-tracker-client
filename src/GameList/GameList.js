import React, {Component} from 'react'
import {Link} from 'react-router-dom'
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

  getGames() {
    fetch(`${API_ENDPOINT}/games`)
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
          {games.map((item) => <Game game={item} key={item.id} saved={"saved"}/>)}
        </>
      )
    }
  }

  render() {
    return (
      <>
        <h1>Game List</h1>
        <Link to='/addGame'>Add Game</Link>
        {this.renderGames()}
      </>
    );
  }
}

export default GameList;