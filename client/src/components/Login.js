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
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.setState({[e.target.id]: e.target.value})
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
    const { username, password, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <Link 
        to="/">Home
        </Link>
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <label>Username:</label>
            <input
            id="username"
            type="text"
            value={username}
            onChange={this.onChange}
            error = {errors.username}/>
          </div>
          <div>
            <label>Password:</label>
            <input
            id="password"
            type="password"
            value={password}
            onChange={this.onChange}
            error = {errors.password}/>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login