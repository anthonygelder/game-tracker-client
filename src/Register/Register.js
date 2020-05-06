import React, { Component } from 'react'
// import { Route } from 'react-router-dom'
import './Register.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state.email, this.state.name)
        console.log(this.state.password, this.state.confirmPassword)
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
                </form>
            </>
        );
    }
}

export default Register;