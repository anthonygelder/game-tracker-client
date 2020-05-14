import React, { Component } from 'react'
import TokenService from '../services/token-service'
// import { Route } from 'react-router-dom'
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(this.state.email, this.state.password)
        )
    }

    updateEmail(email) {
        this.setState({ email: email })
    }

    updatePassword(password) {
        this.setState({ password: password })
    }

    render() {
        return (
            <>
                <h2>Login</h2>
                <form onSubmit={e => this.handleSubmit(e)} > 
                    <label htmlFor="email">Email:</label>
                    <input required type='text' name="email" id="email" value={this.state.email} onChange={e => this.updateEmail(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input required type='password' name="password" id="password" value={this.state.password} onChange={e => this.updatePassword(e.target.value)} />
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </>
        );
    }
}

export default Login;