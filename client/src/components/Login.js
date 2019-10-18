import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
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

    console.log(userData);
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
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