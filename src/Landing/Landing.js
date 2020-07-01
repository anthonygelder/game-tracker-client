import React, {Component} from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

class Landing extends Component {

  renderLoginLink() {
    return (
      <div className='buttons'>
          <Link to='/register'>
              <button>
                  Register
              </button>
          </Link>
          <Link to='/login'>
              <button>
                  Login
              </button>
          </Link>
      </div>
    )
  }

  render() {
    return (
      <div className="main">
        <section className="section">
          <h1 className='landing'>Game Tracker</h1>
          <div>
            <h2>Welcome to your personal video game tracker.</h2>
          </div>
          <div className="background"></div>
          <ul>
            <li>Add games to your library.</li>
            <li>Update your progress along the way.</li>
            <li>See how many games you have completed.</li>
          </ul>
          <h2>Get started below.</h2>
        </section>
        <div className="landingBottom">
          <p>Create a new account or use the test account.</p>
          <p>Test User: test@user.com</p>
          <p>Test Password: Password22!</p>
        
          {window.sessionStorage.getItem("userId") ? 
          <Link to='/games'>
            <button>
              View Games
            </button>
          </Link> : this.renderLoginLink()}
        </div>
      </div>
    );
  }
}

export default Landing;