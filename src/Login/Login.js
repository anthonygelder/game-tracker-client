import React, { Component } from 'react'
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

    render() {
        return (
        <>
            <h1>Login</h1>
            <form>
                <label>Email:</label>
                <input type='text' value={this.state.email} onChange={this.updateEmail} />
                <label>Password:</label>
                <input type='text' value={this.state.password} onChange={this.updatePassword} />
            </form>
        </>
        );
    }
}

export default Login;