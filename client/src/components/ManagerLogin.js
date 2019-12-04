import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ManagerLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            errors: {}
        };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value})
      }
      onSubmit = e => {
        e.preventDefault();
    
        const managerData = {
          email: this.state.email,
          password: this.state.password
        }
        
        axios
        .post("http://localhost:5000/api/manager/login", managerData)
        .then(res => console.log(res))
        .then(() => this.setState(() => ({
        toDashboard: true
        })))
        .catch(err => console.log(err));
    }

    render() {
        const { email, password, errors } = this.state;
        
        return (
          <div>
            <h1>Login</h1>
            <Link 
            to="/">Home
            </Link>
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <label>Email: </label>
                <input
                id="email"
                type="text"
                value={email}
                onChange={this.onChange}
                error={errors.email}/>
              </div>
              <div>
                <label>Password: </label>
                <input
                id="password"
                type="password"
                value={password}
                onChange={this.onChange}
                error={errors.password}/>
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        )
      }
}


export default ManagerLogin