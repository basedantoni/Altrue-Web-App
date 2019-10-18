import React, { Component } from "react";
import { Navbar, Button } from "reactstrap";
import { Link } from "react-router-dom";

class LandingPage extends Component {

  render() {
    return (
      <div>
        <h1>Landing Page</h1>
        <div>
          <Link
            to="/register"
          >Register
          </Link>
        </div>
        <div>
          <Link
          to="/login"
          >Login
          </Link>
        </div>
      </div>
    )
  }
}

export default LandingPage