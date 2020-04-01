import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import Header from './Header/Header'
import Landing from './Landing/Landing'
import AddGame from './AddGame/AddGame'
import EditGame from './EditGame/EditGame'
import Game from './Game/Game'
import GameList from './GameList/GameList'

import './App.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: {}
    }
  }

  componentDidMount() {
    fetch(`https://rawg-video-games-database.p.rapidapi.com/games`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
	        "x-rapidapi-key": "456efb0483msh86ebfface36e894p1cb243jsn4beee219a6e0"
      },
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="header">
            <Route path='/' render={() => <Header />} />
          </div>
          <main className='App'>
            <Route exact path="/" render={() => <Landing />} />
            <Route exact path="/games" render={() => <GameList />} />
            <Route exact path="/addGame" render={(routeProps) => <AddGame routeProps={routeProps}/>} />
            <Route exact path="/editGame/:entry_id" render={(routeProps) => <EditGame routeProps={routeProps}/>} />
            <Route exact path="/games/:entry_id" render={(routeProps) => <Game routeProps={routeProps} />} />
          </main>
        </div>
      </>
    );
  }
}

export default App;