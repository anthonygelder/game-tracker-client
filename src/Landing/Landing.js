import React, {Component} from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

class Landing extends Component {

  render() {
    return (
      <>
        <section>
          <div className="section">
            <h2>Welcome to your personal video game tracker.</h2>
          </div>
          <div className="background"></div>
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