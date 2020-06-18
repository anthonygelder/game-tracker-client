import React, {Component} from 'react'
import TokenService from '../services/token-service'
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
    handleLogoutClick = () => {
        window.sessionStorage.removeItem("userId")
        TokenService.clearAuthToken()
    }

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <Link onClick={this.handleLogoutClick} to='/'>
                    <button>
                        Logout
                    </button>
                </Link>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in buttons'>
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
            <header> 
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <h1>Game Tracker</h1>
                </Link>
                <div>
                    {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
                </div>
            </header>
        )
    }
}

export default Header;