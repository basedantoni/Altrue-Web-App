import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
// import PropTypes from "prop-types";
// import { registerUser } from "../actions/authActions";
// import { connect } from "react-redux";
// import classNames from "classnames";

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      password2: ""
    }
  }


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    axios
    .post("http://localhost:5000/api/users/register", newUser)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  render() {
    const { name, username, email, password, password2 } = this.state
    return (
      <div>
        <Link 
        to="/">Home
        </Link>
        <form onSubmit={this.onSubmit}>
        <div>
            <label>Name: </label>
            <input 
            type="text" 
            value={name} 
            name="name"
            onChange={this.onChange}/>
          </div>
          <div>
            <label>Username: </label>
            <input 
            type="text" 
            value={username} 
            name="username"
            onChange={this.onChange}/>
          </div>
          <div>
            <label>Email: </label>
            <input 
            type="email" 
            value={email} 
            name="email"
            onChange={this.onChange}/>
          </div>
          <div>
            <label>Password: </label>
            <input 
            type="password" 
            value={password} 
            name="password"
            onChange={this.onChange}/>
          </div>
          <div>
            <label>Confirm Password: </label>
            <input 
            type="password" 
            value={password2} 
            name="password2"
            onChange={this.onChange}/>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}

export default Register