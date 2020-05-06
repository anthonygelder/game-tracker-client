import React, {Component} from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <>
        <section>
          <h2>Game Tracker</h2>
          <ul>
            <li>Add your game library.</li>
            <li>Track your progress.</li>
            <li>Rate game after completion.</li>
          </ul>
          <Link to='/games'>
            <button>
              View Games
            </button>
          </Link>
        </section>
      </>
    );
  }
}

export default Landing;