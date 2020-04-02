import React, {Component} from 'react'
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
      console.log(data)
      this.getNames(data)
    })
  }

  getNames(data) {
    let gameNames = []
    data.results.map((item) => gameNames.push(item.name))
    this.setState({
      suggestions: gameNames
    })
  }

  onTextChanged = (e) => {
    const value = e.target.value
    this.setState({
      text: value
    })
    if (this.state.text.length > 2) {
      this.searchGames()
    }
  }

  suggestionSelected(value) {
    this.setState({
      text: value,
      suggestions: []
    })
  }

  renderSuggestions() {
    const { suggestions } = this.state
    if (suggestions.length === 0) {
      return null
    }
    return (
      <ul>
        {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
      </ul>
    )
  }

  render() {
    console.log(this.state.suggestions)
    const { text } = this.state
    return (
      <>
        <h1>Add Game</h1>
        <input value={text} onChange={this.onTextChanged} type="text" />
        {this.renderSuggestions()}
      </>
    );
  }
}

export default AddGame;