import React, {Component} from 'react'
import {Link} from 'react-router-dom'
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
        console.log(data)
      })
  }

  componentDidMount() {
    this.getGames()
  }

  render() {
    console.log(this.state.games)
    return (
      <>
        <h1>Game List</h1>
        <Link to='/addGame'>Add Game</Link>
      </>
    );
  }
}

export default GameList;