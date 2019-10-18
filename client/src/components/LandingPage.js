import React, { Component } from "react";
import { Navbar, Button } from "reactstrap";
import { Link } from "react-router-dom";

class LandingPage extends Component {

  render() {
    return (
      <div style={{height:"75vh"}} className="cotainer valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Altrue a hub for volunteer <b>work</b> and <b>chariety</b>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Donate your time or money to the non-profit organization of your choice.
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >Register
              </Link>
            </div>
              <div className="col s6">
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
                  >Login
                </Link>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage