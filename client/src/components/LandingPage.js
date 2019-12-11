import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from './logo.png';

class LandingPage extends Component {

  render() {
    return (
      <div style={{height:"75vh"}} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <img src={Logo} alt='website logo' />
              <br></br>
              Austin's leading hub connecting
              <br/>
              <b>volunteers</b> to <b>charities</b>!
            </h4>
            <br/>
            <p className="flow-text grey-text text-darken-1">
              <i>Register or login now to start donating your <br/>
              time or money to the non-profit organizations of your choice.</i>
            </p>
            <br />
            <p>———————————————</p>
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
            <br/>
            <p>————————</p>
            <div className="col s6">
              <Link
                to="/registerManager"
                style={{
                  width: "200px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >Register as Manager
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/loginManager"
                style={{
                  width: "200px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
                >Login as a Manager
              </Link>
            </div>
            <br/>
            <p>————————</p>
            <div className="col s6">
              <Link
                to="/loginAdmin"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
                >Admin Login
              </Link>
            </div>
            <br/>
            <p>—————————————————</p>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage