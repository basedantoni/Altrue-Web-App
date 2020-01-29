import React, { Component } from "react";
import Logo from './logo.png';

class LandingPage extends Component {

  render() {
    return (
      <div style={{height:"75vh", margin: "20px", padding: "30px"}}>
        <div>
          <div>
          <div style={{height:"75vh"}} className="container valign-wrapper">
          <div className="row">
          <div className="col s12 center-align">
          <img src={Logo} alt='website logo' />
          </div>
          </div>
            <h1>
            A hub for volunteer <b>work</b> and <b>charity</b>.
            </h1>
            <p style={{fontSize:"20px"}}>
              Donate your time or money to the non-profit organization of your choice.
            </p>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage