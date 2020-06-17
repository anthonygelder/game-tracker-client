import React, { Component } from 'react'
// import { Route } from 'react-router-dom'
import AuthApiService from '../services/auth-api-service'
import './Register.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            password: 'Password22!',
            confirmPassword: 'Password22!',
            error: null
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({error: "Passwords do not match."})
        } else {
            this.setState({
                error: null
            });
            this.addUser()
        }
    }

    addUser() {
        AuthApiService.postUser({
            user_name: this.state.name,
            password: this.state.password,
            user_email: this.state.email,
        })
        .then(user => {
            this.props.routeProps.history.push('/login')
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
    }

    updateEmail(email) {
        this.setState({ email: email })
    }

    updateName(name) {
        this.setState({ name: name })
    }

    updatePassword(password) {
        this.setState({ password: password })
    }

    updateConfirmPassword(confirmPassword) {
        this.setState({ confirmPassword: confirmPassword })
    }

    render() {
        return (
            <>
                <h2>Register</h2>
                <form onSubmit={e => this.handleSubmit(e)} > 
                    <label htmlFor="email">Email:</label>
                    <input required type='text' name="email" id="email" value={this.state.email} onChange={e => this.updateEmail(e.target.value)} />
                    <label htmlFor="name">Name:</label>
                    <input required type='text' name="name" id="name" value={this.state.name} onChange={e => this.updateName(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input required type='password' name="password" id="password" value={this.state.password} onChange={e => this.updatePassword(e.target.value)} />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input required type='password' name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword} onChange={e => this.updateConfirmPassword(e.target.value)} />
                    <button type="submit">
                        Submit
                    </button>
                    {this.state.error ? <p className="error">{this.state.error}</p> : ''}
                </form>
            </>
        );
    }
}

export default Register;