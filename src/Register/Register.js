import React, { Component } from 'react'
// import { Route } from 'react-router-dom'
import './Register.css'

class Register extends Component {
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
        <h1>Register</h1>
      </>
    );
  }
}

export default Register;