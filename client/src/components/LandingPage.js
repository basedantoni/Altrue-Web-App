import React, { Component } from "react";
import Logo from './logo.png';
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import "../App.css";

class LandingPage extends Component {

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <div style={{height:"75vh", margin: "20px", padding: "30px"}}>
          <div style={{height:"75vh"}} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <img src={Logo} alt='website logo' />
            </div>
          </div>
          <MDBCol md="4">
            <h1>
            A hub for volunteer <b>work</b> and <b>charity</b>.
            </h1>
            <p style={{fontSize:"20px"}}>
              Donate your time or money to the <br/>non-profit organization of your choice.
            </p>
            </MDBCol>
          </div>
        </div>
      </MDBRow>
      </MDBContainer>
    )
  }
}

export default LandingPage