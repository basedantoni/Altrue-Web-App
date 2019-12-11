import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { registerManager } from "../actions/authActions";
import { connect } from "react-redux";

class ManagerRegister extends Component {
  constructor() {
    super()

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
      orgId: this.state.orgId,
      orgName: this.state.orgName,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerManager(newManager, this.props.history); 
  }

  render() {
    const { name, username, email, orgId, orgName, password, password2, toDashboard, errors } = this.state

    if (toDashboard === true) {
      return <Redirect to='/dashboard' />
    }

    return (
      <div>
        <h1>Manager Registration</h1>
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
            <label>Orginization ID: </label>
            <input 
            id="orgId"
            type="text" 
            value={orgId} 
            onChange={this.onChange}
            errors={errors.orgId}/>
          </div>
          <div>
            <label>Orginization Name: </label>
            <input 
            id="orgName"
            type="text" 
            value={orgName} 
            onChange={this.onChange}
            errors={errors.orgName}/>
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

ManagerRegister.propTypes = {
  registerManager: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerManager }
)(withRouter(ManagerRegister));