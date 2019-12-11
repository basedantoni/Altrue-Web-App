import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class AdminDashboard extends Component {
  componentDidMount() {

  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <h1>Hello Admin!</h1>

        <button
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
        >
        Logout
        </button>
      </div>
    )
  }
}

AdminDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser}
)(AdminDashboard);