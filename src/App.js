import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import Header from './Header/Header'
import Landing from './Landing/Landing'
import AddGame from './AddGame/AddGame'
import Game from './Game/Game'
import GameList from './GameList/GameList'
import Login from './Login/Login'
import Register from './Register/Register'

import './App.css'


class App extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     games: {}
  //   }
  // }

  render() {
    return (
      <>
        <div className="container">
          <div className="header">
            <Route path={["/games","/addGame","/games/:entry_id","/register","/login"]} render={() => <Header />}  />
          </div>
          <main className='App'>
            <Route exact path="/" render={() => <Landing />} />
            <Route exact path="/games" render={(routeProps) => <GameList routeProps={routeProps}/>} />
            <Route exact path="/addGame" render={(routeProps) => <AddGame routeProps={routeProps}/>} />
            <Route exact path="/games/:entry_id" render={(routeProps) => <Game routeProps={routeProps} />} />
            <Route exact path="/register" render={(routeProps) => <Register routeProps={routeProps} />} />
            <Route exact path="/login" render={(routeProps) => <Login routeProps={routeProps} />} />
          </main>
          <footer>  
            <p>Game Tracker © 2020</p>
          </footer>
        </div>
      </>
    );
  }
}

export default App;