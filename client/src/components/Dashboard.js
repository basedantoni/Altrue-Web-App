import React, { Component } from 'react';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <button onClick={this.onLogoutClick}>Logout</button>
      </div>
    )
  }
}

export default Dashboard
