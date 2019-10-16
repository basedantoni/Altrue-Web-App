import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
    }
  }

  handleInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    //e.preventDefault();
    console.log(this.state)

    axios.post("http://localhost:5000/api/users/", this.state)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { username } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username: </label>
            <input 
            type="text" 
            value={username} 
            name="username"
            onChange={this.handleInputs}/>
            <button type="submit">Submit</button>
          </div>
        </form>
        <form onSubmit={this.handleDelete}>
          <button type="submit">Delete</button>
        </form>
      </div>
    )
  }
}

export default Register