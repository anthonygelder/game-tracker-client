import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './GameList.css'

class GameList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <>
        <h1>Game List</h1>
        <Link to='/addGame'>Add Game</Link>
      </>
    );
  }
}

export default GameList;