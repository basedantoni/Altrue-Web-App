import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getUsers, deleteUser } from "../../actions/adminActions";
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
        date: user.date.substring(0,10),
        userId: user._id
      })
    });

    const userColumns = [
     { title: "Name", field: "name" },
     { title: "Email", field: "email" },
     { title: "Username", field: "username"},
     { title: "Date Joined", field: "date" },
     { title: "User ID", field: "userId"}
    ];

    return (
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <h1>Hello Admin!</h1>
        <div style={{ maxWidth: '80%', margin: 'auto' }}>
          <MaterialTable   
            actions = {[
              { 
                icon:  'delete',
                tooltip: 'Delete User',
                onClick: (e, userColumns) => {
                  const confirm = window.confirm('You want to delete '+ userColumns.name +'?')
                  if(confirm) {
                    this.props.deleteUser(userColumns.userId)
                    this.props.getUsers();                    
                  }
                }
              }
            ]}
            columns={userColumns}
            data={userData}
            title='Current Users'
            options={{
              headerStyle: {
                backgroundColor: '#FFF',
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
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { logoutUser, getUsers, deleteUser }
)(AdminDashboard);