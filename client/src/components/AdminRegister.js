import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { registerAdmin } from "../actions/authActions";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

class AdminRegister extends Component {
  constructor() {
    super()

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
      this.props.history.push("/adminDashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newAdmin = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerAdmin(newAdmin, this.props.history); 
  };

  render() {
    const { name, username, email, password, password2, toDashboard, errors } = this.state

    if (toDashboard === true) {
      return <Redirect to='/adminLogin' />
    }

    return (
      <div>
        <Link 
        to="/">Home
        </Link>
        <form className={useStyles.root} noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <div>
            <TextField 
            label="Name" 
            id="name"
            type="text"
            value={email}
            onChange={this.onChange}
            error={errors.email}/>
          </div>
          <div>
            <TextField 
            label="Email" 
            id="email"
            type="text"
            value={email}
            onChange={this.onChange}
            error={errors.email}/>
          </div>
          <div>
            <TextField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={this.onChange}
            error={errors.password}/>
          </div>
          <button type="submit">Login</button>
        </form>

        
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

AdminRegister.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerAdmin }
)(withRouter(AdminRegister));