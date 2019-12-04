import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "../actions/authActions";
import { connect } from "react-redux";

class Register extends Component {
  constructor() {
    super()

    //Updated from onChange changes
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      toDashboard: false,
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  //Displays text from text field, changing everything in initial state
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  //Submit button for register created
  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history); 
  };

  render() {
    const { name, username, email, password, password2, toDashboard, errors } = this.state

    if (toDashboard === true) {
      return <Redirect to='/dashboard' />
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));