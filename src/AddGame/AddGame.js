import React, {Component} from 'react'
import Game from '../Game/Game'
import './AddGame.css'

class AddGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      suggestions: [],
      text: ''
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
      // this.getNames(data)
    })
  }

  // getNames(data) {
  //   let gameNames = []
  //   data.results.map((item) => gameNames.push(item.name))
  //   this.setState({
  //     suggestions: gameNames
  //   })
  // }

  onTextChanged(text){
    this.setState({text: text})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.searchGames()
}

  // suggestionSelected(value) {
  //   this.setState({
  //     text: value,
  //     suggestions: []
  //   })
  // }

  renderSuggestions() {
    const { suggestions } = this.state
    if (suggestions.length === 0) {
      return null
    } else {
      return (
        <>
          {suggestions.map((item) => <Game game={item} key={item.id} />)}
        </>
      )
    }
  }

  render() {
    // console.log(this.state)
    return (
      <>
        <h1>Add Game</h1>
        <form className="addEntry" onSubmit={e => this.handleSubmit(e)}>
          <input required type="text" onChange={e => this.onTextChanged(e.target.value)} />
          <button type="submit">
            Add
          </button>
        </form>
        <div className="games">
          {this.renderSuggestions()}
        </div>
      </>
    );
  }
}

export default AddGame;