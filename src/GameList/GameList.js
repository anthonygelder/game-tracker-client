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
      games: [],
      filteredGames: []
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
      console.log('set data')
      this.setState({
        games: data
      })
      this.selectFilter()
    })
  }

  componentDidMount() {
    this.getGames()
  }

  filterGames() {
    console.log('filter')
    const { games } = this.state
    console.log('games', games)
    return games.filter(game => game.status === "Just Started" || game.status === "In Progress" || game.status === "Almost Done")
  }

  filterBackGames() {
    const { games } = this.state
    return games.filter(game => game.status === "Backlog")
  }

  filterCompleteGames() {
    const { games } = this.state
    return games.filter(game => game.status === "Complete")
  }

  updateFilter(games) {
    console.log('update filter', games)
    this.setState({
      filteredGames: games
    })
  }

  selectFilter(status) {
    console.log('click')
    let { games } = this.state
    switch (status) {
      case "Complete":
        games = this.filterCompleteGames()
        break
      case "Backlog":
        games = this.filterBackGames()
        break
      case "All":
        games = this.state.games
        break
      default:
        console.log('default')
        games = this.filterGames()
        break
    }
    this.updateFilter(games)
    this.renderGames()
  }
  
  renderGames() {
    const { filteredGames } = this.state
    console.log(filteredGames)
    if (filteredGames.length === 0) {
      return null
    } else {
      return (
        <>
            {filteredGames.map((item) => <Game game={item} key={item.id} saved={"saved"} routeProps={this.props.routeProps} getGames={(gameId) => this.getGames()} deleteGame={(gameId) => this.deleteGame(gameId) }/>)}
          </>
        )
      }
    }

  // filterGames() {
  //   const { games } = this.state
  //   return games.filter(game => game.status !== "Complete")
  // }

  // renderGames() {
  //   const gamesNotDone = this.filterGames()
  //   if (gamesNotDone.length === 0) {
  //     return null
  //   } else {
  //     return (
  //       <>
  //         {gamesNotDone.map((item) => <Game game={item} key={item.id} saved={"saved"} routeProps={this.props.routeProps} getGames={(gameId) => this.getGames()} deleteGame={(gameId) => this.deleteGame(gameId) }/>)}
  //       </>
  //     )
  //   }
  // }

  render() {
    return (
      <>
        <section>
          <h2>Your Games</h2>
          <button value="Complete" onClick={e => this.selectFilter(e.target.value)}>Complete</button>
          <button value="Backlog" onClick={e => this.selectFilter(e.target.value)}>Backlog</button>
          <button value="All" onClick={e => this.selectFilter(e.target.value)}>All</button>
          <button onClick={e => this.selectFilter()}>Currently Playing</button>

          <Link to='/addGame'>
            <button>
              Add Game
            </button>    
          </Link>
        </section>
        <div className="games">
          {this.renderGames()}
        </div>
      </>
    );
  }
}

export default GameList;