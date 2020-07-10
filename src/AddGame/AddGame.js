import React, {Component} from 'react'
import Game from '../Game/Game'
import {Link} from 'react-router-dom'
import TokenService from '../services/token-service'
import './AddGame.css'
const { API_ENDPOINT } = require('../config')

class AddGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      text: '',
      status: '',
      year: '',
      image: ''
    }
  }

  componentDidMount() {
    if(!window.sessionStorage.getItem("userId")) {
      this.props.routeProps.history.push('/')
    }
  }

  searchGames() {
    fetch(`https://rawg-video-games-database.p.rapidapi.com/games?search=${this.state.text}`, {
      method: 'GET',
      headers: {
          "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
	        "x-rapidapi-key": "456efb0483msh86ebfface36e894p1cb243jsn4beee219a6e0"
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({ suggestions: data.results })
    })
  }

  addGame(game) {
    // fetch(`${API_ENDPOINT}/games/`, {
    fetch(`https://young-river-73543.herokuapp.com/api/games`, {
        method: 'POST',
        body: JSON.stringify(game),
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json'
        },
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(error => {
                throw error
            })
            }
            return res.json()
        })
        .then(data => {
            this.props.routeProps.history.push('/games')
        })
        .catch(error => {
          console.log(error)
            console.error(error)
    })
}

  submitGame() {
    const newGame = {
      game: this.state.text,
      status: this.state.status,
      year: this.state.year, 
      image: this.state.image,
      user_id: window.sessionStorage.getItem("userId")
    }
    this.addGame(newGame)
  }

  onTextChanged(text){
    this.setState({text: text})
  }

  onStatusChanged(status){
    this.setState({status: status})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.searchGames()
}

  selectGame = (game) => {
    const yearInt = parseInt(game.released.slice(0,-6))
    this.setState({
      text: game.name,
      year: yearInt,
      image: game.background_image,
      suggestions: []
    })
  }

  clear = () => {
    this.setState({
      text: '',
      suggestions: []
    })
  }

  renderSuggestions() {
    const { suggestions } = this.state
    if (suggestions.length === 0) {
      return null
    } else {
      return (
        <>
          {suggestions.map((item) => <Game game={item} key={item.id} selectGame={this.selectGame}/>)}
        </>
      )
    }
  }

  render() {
    return (
      <>
        <h2>Add Game</h2>
        <form className="addEntry" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="game">Game:</label>
          <input required type="text" id="game" value={this.state.text} onChange={e => this.onTextChanged(e.target.value)} />
          {this.state.suggestions.length === 0 ? <button type="submit">Search</button> : <button className="delete" onClick={this.clear}>Clear</button>}
        </form>
        <div className="games">
          {this.renderSuggestions()}
        </div>
        <div className="addGame">
          <label htmlFor="status">Status:</label>
          <select id="status" onChange={e => this.onStatusChanged(e.target.value)} >
            <option value="" disabled selected>Select a status</option>
            <option value="Backlog">Backlog</option>
            <option value="Just Started">Just Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Almost Done">Almost Done</option>
            <option value="Complete">Complete</option>
          </select>
          <button className="add" onClick={e => this.submitGame(e)}>
            Add
          </button>
        </div>
        <Link to='/games'>
          <button>Go Back</button>    
        </Link>
      </>
    );
  }
}

export default AddGame;