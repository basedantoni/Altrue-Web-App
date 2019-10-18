import React, { Component } from "react";
import axios from "axios";

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
    console.log(this.state)

    axios.post("http://localhost:5000/api/users/register", this.state)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { name, username, email, password, password2 } = this.state
    return (
      <div>
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