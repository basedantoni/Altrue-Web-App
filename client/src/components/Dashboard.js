import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      jwtoken: ""
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    //const { user } = this.props.auth;
    return (
      <div>
        <button onClick={this.onLogoutClick}>Logout</button>
      </div>
    )
  }
}

export default Dashboard
