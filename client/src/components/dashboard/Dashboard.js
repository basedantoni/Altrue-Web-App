import React, { Component } from 'react';
import PlaidLinkButton from "react-plaid-link-button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getUserStats } from "../../actions/authActions";
import { getAccounts, addAccount } from "../../actions/plaidActions";

import Accounts from "./Account";
import Stats from "./Stats";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAccounts();
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  // Add account
  handleOnSuccess = (token, metadata) => {
    const plaidData = {
      public_token: token,
      metadata: metadata
    };
  this.props.addAccount(plaidData);
  };

  render() {
    const { user } = this.props.auth;
    const { accounts, accountsLoading } = this.props.plaid;

    let dashboardContent;
    if (accounts === null || accountsLoading) {
      dashboardContent = <p className="center-align">Loading...</p>;
    } else if (accounts.length > 0) {
      // User has accounts linked
      dashboardContent = <div><Accounts user={user} accounts={accounts} /><Stats user={user} /></div>;
    } else {
      // User has no accounts linked
      dashboardContent = (
        <div>
          <div>
            <PlaidLinkButton
              buttonProps={{
              className:
                  "btn btn-large waves-effect waves-light hoverable blue accent-3 main-btn"
              }}
              plaidLinkProps={{
                clientName: "Altrue",
                key: "149919998b1615c24386e3ad303fbc",
                env: "sandbox",
                product: ["transactions"],
                onSuccess: this.handleOnSuccess
              }}
              onScriptLoad={() => this.setState({ loaded: true })}
              >
              Link Account
            </PlaidLinkButton>
          </div>
            <button
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable red accent-3 main-btn"
            >
            Logout
            </button>
        </div>
      );
    }
    return <div>{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAccounts: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plaid: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { logoutUser, getAccounts, addAccount, getUserStats }
)(Dashboard);