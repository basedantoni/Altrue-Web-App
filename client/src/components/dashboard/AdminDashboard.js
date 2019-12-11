import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getUsers } from "../../actions/authActions";
import MaterialTable from "material-table";

class AdminDashboard extends Component {
  componentDidMount() {
    const { users } = this.props;
    this.props.getUsers();
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { users } = this.props
    console.log(users)

    const userColumns = [
     { title: "Username", field: "username" },
     { title: "Email", field: "email" },
     { title: "Date Joined", field: "date" },
    ];

    const actions = [
      { icon:  'delete',
        tooltip: 'Delete User',
        onClick: () => window.confirm('You want to delete   ?')
      }
    ];

    let userData = [];

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
});

export default connect(
  mapStateToProps,
  { logoutUser, getUsers }
)(AdminDashboard);