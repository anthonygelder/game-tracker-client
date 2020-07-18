import React, {Component} from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

class Landing extends Component {

  renderLoginLink() {
    return (
      <div className='buttons'>       
        <Link to='/login'>
            <button>
                Login
            </button>
        </Link>
        <p>or</p>
        <Link to='/register'>
            <button>
                Register
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
          <div>
            <h2 className="lightText">Add games to your library. Keep track of the games you are currently playing.</h2>
            <div className="landingImg">
              <img src={ require('../img/1.png')} alt='screenshot of app'/>
              <img src={ require('../img/2.png')} alt='screenshot of app'/>
            </div>
            <h2 className="lightText">Update your games progress while you play. Give completed games a rating.</h2>
            <div className="landingImg">
              <img src={ require('../img/3.png')} alt='screenshot of app'/>
              <img src={ require('../img/4.png')} alt='screenshot of app'/>
            </div>
          </div>
          <h2 className="started">Get started below!</h2>
        </section>
        <div className="landingBottom">
          <p>Create a new account or use the test account.</p>
          <p>Test User: test@user.com</p>
          <p>Test Password: Password1!</p>
        
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