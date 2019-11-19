import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authActions";
import { connect } from "react-redux";

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
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
    this.setState({[e.target.id]: e.target.value})
  }
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);