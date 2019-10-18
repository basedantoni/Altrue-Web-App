import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import PropTypes from "prop-types";
// import { loginUser } from "../actions/authActions";
// import { connect } from "react-redux";
// import classNames from "classnames";

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); //push user to dashboard when logging in
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    }

    axios
      .post("http://localhost:5000/api/users/login", userData)
      .then(res => console.log(res))
      .catch(err => console.log(err))

  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <Link 
        to="/">Home
        </Link>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Username:</label>
            <input
            type="text"
            value={username}
            name="username"
            onChange={this.onChange}/>
          </div>
          <div>
            <label>Password:</label>
            <input
            type="password"
            value={password}
            name="password"
            onChange={this.onChange}/>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login