import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class ManagerDashboard extends Component {
  componentDidMount() {

  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
<<<<<<< HEAD
    <div>
      <br/>
    <h1>Welcome Manager!</h1>
    <div className="col s6">
      <Link
        to="/create-events"
        style={{
        width: "140px",
        borderRadius: "3px",
        letterSpacing: "1.5px"
         }}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >Create Events
      </Link>
      <br/>
      <br/>
      <br/>
      </div>
      <div className="col s6">
      <Link
        to="/events"
        style={{
        width: "140px",
        borderRadius: "3px",
        letterSpacing: "1.5px"
         }}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >Display Events
      </Link>
      <br/>
      <br/>
      <br/>
      </div>
    <button
      onClick={this.onLogoutClick}
      className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
    >
    Logout
    </button>
    </div>
=======
      <div>
        <h1>Hello Manager!</h1>
        <div className="col s6">
          <Link
            to="/create-events"
            style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px"
            }}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >Create Events
          </Link>
          <br/>
          <br/>
          <br/>
        </div>
        <div className="col s6">
          <Link
            to="/events"
            style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px"
            }}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >Display Events
          </Link>
          <br/>
          <br/>
          <br/>
        </div>
        <button
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
        >
        Logout
        </button>
      </div>
>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
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