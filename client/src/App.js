import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AdminLogin from "./components/AdminLogin";
import Register from "./components/Register";
import Login from "./components/Login";
import ManagerRegister from "./components/ManagerRegister";
import ManagerLogin from "./components/ManagerLogin";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Link from "./components/Link"
import ManagerDashboard from "./components/dashboard/ManagerDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import Events from "./components/Events";
import CreateEvents from "./components/CreateEvents";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAunthenticated
  store.dispatch(setCurrentUser(decoded));


  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    window.location.href = "./login"
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/registerManager" component={ManagerRegister}/>
            <Route exact path="/loginManager" component={ManagerLogin}/>
            <Route exact path="/loginAdmin" component={AdminLogin}/>
            <Route exact path="/events" component={Events}/>
            <Route exact path="/create-events" component={CreateEvents}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/managerDashboard" component={ManagerDashboard}/>
              <PrivateRoute exact path="/adminDashboard" component={AdminDashboard}/>
            </Switch>
            <Route exact path="/link" component={Link} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
