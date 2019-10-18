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

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <div>
            <label>Username:</label>
            <input
            type="text"
            value={username}
            name="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input
            type="password"
            value={password}
            name="password"/>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login