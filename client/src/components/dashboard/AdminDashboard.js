import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getUsers } from "../../actions/adminActions";
import MaterialTable from "material-table";

class AdminDashboard extends Component {
  
  componentDidMount() {
    this.props.getUsers();
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { users } = this.props.admin

    let userData = [];

    users.forEach(user => {
      userData.push({
        name: user.name,
        email: user.email,
        username: user.username,
        date: user.date
      })
    });

    console.log(userData)
    const userColumns = [
     { title: "Name", field: "name" },
     { title: "Email", field: "email" },
     { title: "Username", field: "username"},
     { title: "Date Joined", field: "date" },
    ];

    const actions = [
      { icon:  'delete',
        tooltip: 'Delete User',
        onClick: () => window.confirm('You want to delete   ?')
      }
    ];

    return (
      <div>
        <h1>Hello Admin!</h1>
        <div style={{ maxWidth: '80%', margin: 'auto' }}>
          <MaterialTable
            actions={actions}
            columns={userColumns}
            data={userData}
            title='Current Users'
            options={{
              headerStyle: {
                backgroundColor: '#039be5',
              }
            }}
          />
        </div>
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
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { logoutUser, getUsers }
)(AdminDashboard);