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
        <h1>Landing</h1>
        <Link to='/games'>
          <button>
            View Games
          </button>
        </Link>
      </>
    );
  }
}

export default Landing;