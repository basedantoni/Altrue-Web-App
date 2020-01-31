import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import CreateEvents from "../CreateEvents";
import Events from "../Events";

class ManagerDashboard extends Component {
  componentDidMount() {
    console.log(this.props.auth.user)
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <h1>Hello Manager!</h1>
        <button
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
        >
        Logout
        </button>

        <CreateEvents></CreateEvents>
        <Events></Events>
      </div>
    )
  }
}

ManagerDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser}
)(ManagerDashboard);