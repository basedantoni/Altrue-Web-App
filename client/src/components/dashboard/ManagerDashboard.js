import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import CreateEvents from "../CreateEvents";
import Events from "../Events";
import Button from '@material-ui/core/Button';

class ManagerDashboard extends Component {
  componentDidMount() {

  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {

    return (
      <div>
        <Button
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
        >
        Logout
        </Button>

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