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
      filteredGames: [],
      active: 'Playing'
    }
  }
  
  deleteGame(gameId) {
    const del = window.confirm("Are you sure you wanna delete this game?")
    if(del) {
      fetch(`${API_ENDPOINT}/games/${gameId}`, {
        method: 'DELETE',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
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
        this.getGames()
      })
      .catch(error => {
        console.error(error)
      })
    }
  }
  
  getGames() {
    // fetch(`https://young-river-73543.herokuapp.com/api/games`, {
    fetch(`${API_ENDPOINT}/games`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'user_id': window.sessionStorage.getItem("userId")
      },
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        games: data
      })
      this.selectFilter()
    })
  }

  componentDidMount() {
    if(window.sessionStorage.getItem("userId")) {
      this.getGames()
    } else {
      this.props.routeProps.history.push('/')
    }
  }

  filterGames() {
    const { games } = this.state
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
    this.setState({
      filteredGames: games
    })
  }

  selectFilter(status) {
    let { games } = this.state
    switch (status) {
      case "Complete":
        games = this.filterCompleteGames()
        this.setState({active:"Complete"})
        break
      case "Backlog":
        games = this.filterBackGames()
        this.setState({active:"Backlog"})
        break
      case "All":
        games = this.state.games
        this.setState({active:"All"})
        break
      default:
        games = this.filterGames()
        this.setState({active:"Playing"})
        break
    }
    this.updateFilter(games)
    this.renderGames()
  }
  
  renderGames() {
    const { filteredGames } = this.state
    if (filteredGames.length === 0) {
      return (
        <>
          <p>No Games.</p>
        </>
      )
    } else {
      return (
          <>
            {filteredGames.map((item) => <Game game={item} key={item.id} saved={"saved"} routeProps={this.props.routeProps} getGames={(gameId) => this.getGames()} deleteGame={(gameId) => this.deleteGame(gameId) }/>)}
          </>
        )
      }
    }

  render() {
    return (
      <>
        <section>
          <h2>Your Games</h2>
          <Link to='/addGame'>
            <button className="add">Add Game</button>    
          </Link>
          <div className='buttons'>
            <button className={this.state.active === 'All' ? 'active' : ''} value="All" onClick={e => this.selectFilter(e.target.value)}>All Games</button>
            <button className={this.state.active === 'Complete' ? 'active' : ''} value="Complete" onClick={e => this.selectFilter(e.target.value)}>Complete</button>
            <button className={this.state.active === 'Backlog' ? 'active' : ''} value="Backlog" onClick={e => this.selectFilter(e.target.value)}>Backlog</button>
            <button className={this.state.active === 'Playing' ? 'active' : ''} value="Playing" onClick={e => this.selectFilter()}>Currently Playing</button>
          </div>
        </section>
        <div className="games">
          {this.renderGames()}
        </div>
      </>
    );
  }
}

export default GameList;