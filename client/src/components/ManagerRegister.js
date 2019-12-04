import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";
// import PropTypes from "prop-types";
// import { registerUser } from "../actions/authActions";
// import { connect } from "react-redux";
// import classNames from "classnames";

class ManagerRegister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      username: "",
      email: "",
      orgId: "",
      orgName: "",
      password: "",
      password2: "",
      toDashboard: false,
      errors: {}
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newManager = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    // this.props.registerUser(newManager, this.props.history); 
    axios
    .post("http://localhost:5000/api/manager", newManager)
    .then(res => console.log(res))
    .then(() => this.setState(() => ({
      toDashboard: true
    })))
    .catch(err => console.log(err));
  }

  render() {
    const { name, username, email, password, password2, toDashboard, errors } = this.state

    if (toDashboard === true) {
      return <Redirect to='/manager-login' />
    }

    return (
      <div>
        <Link 
        to="/">Home
        </Link>
        <form noValidate onSubmit={this.onSubmit}>
        <div>
            <label>Name: </label>
            <input 
            id="name"
            type="text" 
            value={name} 
            onChange={this.onChange}
            errors={errors.name}/>
          </div>
          <div>
            <label>Username: </label>
            <input 
            id="username"
            type="text" 
            value={username} 
            onChange={this.onChange}
            errors={errors.username}/>
          </div>
          <div>
            <label>Email: </label>
            <input
            id="email" 
            type="email" 
            value={email}
            onChange={this.onChange}
            errors={errors.email}/>
          </div>
          <div>
            <label>Password: </label>
            <input 
            id="password"
            type="password" 
            value={password} 
            onChange={this.onChange}
            errors={errors.password}/>
          </div>
          <div>
            <label>Confirm Password: </label>
            <input 
            id="password2"
            type="password" 
            value={password2} 
            onChange={this.onChange}
            errors={errors.password2}/>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}

export default ManagerRegister