import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
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
        this.setState({ error: null })
        AuthApiService.postLogin({
            user_email: this.state.email,
            password: this.state.password
            })
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
                this.props.routeProps.history.push('/games')
            })
            .catch(res => {
            this.setState({ error: res.error })
        })
        // this.props.routeProps.history.push('/games')
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