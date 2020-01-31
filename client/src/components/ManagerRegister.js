import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { registerManager } from "../actions/authActions";
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
        <Link 
        to="/">Home
        </Link>
        <form className={useStyles.root} noValidate autoComplete="off" onSubmit={this.onSubmit}>
          <div>
            <TextField 
            label="Name" 
            id="name"
            type="text"
            value={name}
            onChange={this.onChange}
            error={errors.email}/>
          </div>
          <div>
            <TextField 
            label="Username" 
            id="username"
            type="text"
            value={username}
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
            label="Organization ID" 
            id="orgId"
            type="text"
            value={orgId}
            onChange={this.onChange}
            error={errors.orgId}/>
          </div>
          <div>
            <TextField 
            label="Organization Name" 
            id="orgName"
            type="text"
            value={orgName}
            onChange={this.onChange}
            error={errors.orgName}/>
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
          <div>
            <TextField
            label="Confirm Password"
            id="password2"
            type="password"
            value={password2}
            onChange={this.onChange}
            error={errors.password}/>
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