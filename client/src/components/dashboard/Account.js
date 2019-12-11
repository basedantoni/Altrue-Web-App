import React, { Component } from "react";
import PropTypes from "prop-types";
import PlaidLinkButton from "react-plaid-link-button";
import { connect } from "react-redux";
import {
  getTransactions,
  addAccount,
  deleteAccount,
  getYearlyTransactions
} from "../../actions/plaidActions";

import { logoutUser } from "../../actions/authActions";
import MaterialTable from "material-table"; // https://mbrn.github.io/material-table/#/

class Accounts extends Component {
  componentDidMount() {
    const { accounts } = this.props;
    this.props.getTransactions(accounts);
  }
// Add account
  handleOnSuccess = (token, metadata) => {
    const { accounts } = this.props;
    const plaidData = {
      public_token: token,
      metadata: metadata,
      accounts: accounts
    };
    this.props.addAccount(plaidData);
  };
  // Delete account
  onDeleteClick = id => {
    const { accounts } = this.props;
    const accountData = {
      id: id,
      accounts: accounts
    };
    this.props.deleteAccount(accountData);
  };
  // Logout
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  // Round up donations
  roundUp = amount => {
    return amount
  }

render() {
    const { user, accounts } = this.props;
    const { transactions, transactionsLoading } = this.props.plaid;
    let accountItems = accounts.map(account => (
      <div key={account._id}>
        <button
          onClick={this.onDeleteClick.bind(this, account._id)}
        >
        Delete
        </button>
        <b>{account.institutionName}</b>
      </div>
    ));

    // Setting up data table
    const transactionsColumns = [
      { title: "Account", field: "account" },
      { title: "Date", field: "date", type: "date", defaultSort: "desc" },
      { title: "Name", field: "name" },
      { title: "Amount", field: "amount" },
      { title: "Donation", field: "donation" }
    ];

    let transactionsData = [];
    let donateTotal = 0;

    transactions.forEach(function(account) {
      account.transactions.forEach(function(transaction) {
        if(transaction.amount > 0) {
          const round = Math.round(100*(Math.ceil(transaction.amount) - transaction.amount))/100
          donateTotal += round
          transactionsData.push({
            account: account.accountName,
            date: transaction.date,
            donation: round,
            name: transaction.name,
            amount: transaction.amount
          });
        }
      });
    });

    return (
      <div className="row">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <div className="col s12">
          <h2>Total Change Rounded Up</h2>
          <h3>${Math.round(100 * donateTotal)/100}</h3>
          <hr style={{ marginTop: "2rem", opacity: ".2" }} />
          <h5>
            <b>Transactions</b>
          </h5>
          {transactionsLoading ? (
            <p className="grey-text text-darken-1">Fetching transactions...</p>
          ) : (
            <>
              <p className="grey-text text-darken-1">
                You have <b>{transactionsData.length}</b> transactions from your
                <b> {accounts.length}</b> linked
                {accounts.length > 1 ? (
                  <span> accounts </span>
                ) : (
                  <span> account </span>
                )}
                from the past 30 days
              </p>
              <div style={{ maxWidth: '80%', margin: 'auto' }}>
                <MaterialTable
                  columns={transactionsColumns}
                  data={transactionsData}
                  title="Transactions"
                />
              </div>
            </>
          )}
          <h5>
            <b>Linked Accounts</b>
          </h5>
          <p>
            Add or remove your bank accounts below
          </p>
          <ul>{accountItems}</ul>
          <PlaidLinkButton
            buttonProps={{

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
            Add Account
          </PlaidLinkButton>
          <button
            onClick={this.onLogoutClick}
          >
          Log Out
          </button>
        </div>
      </div>
    );
  }
}

Accounts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  getYearlyTransactions: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  plaid: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  plaid: state.plaid
});

export default connect(
  mapStateToProps,
  { logoutUser, getTransactions, addAccount, deleteAccount, getYearlyTransactions }
)(Accounts);