import React, {Component} from 'react'
import TokenService from '../services/token-service'
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
    handleLogoutClick = () => {
        window.sessionStorage.removeItem("userId")
        window.sessionStorage.removeItem("email")
        TokenService.clearAuthToken()
    }

    renderLogoutLink() {
        return (
            <div>
                {/* <p>{window.sessionStorage.getItem("email")}</p> */}
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
            <div >
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