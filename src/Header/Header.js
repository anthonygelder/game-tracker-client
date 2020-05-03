import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <header> 
            <Link to='/'>
                <h2>Game Tracker</h2>
            </Link>
            <div className='buttons'>
                <Link to='/login'>
                    <button>Login</button>
                </Link>
                <Link to='/register'>
                    <button>Register</button>
                </Link>
            </div>
        </header>
    )
}

export default Header;