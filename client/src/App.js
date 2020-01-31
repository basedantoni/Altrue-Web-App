import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import 'semantic-ui-css/semantic.min.css';
import "./App.css";

import Register from "./components/Register";
import Login from "./components/Login";
import ManagerRegister from "./components/ManagerRegister";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Link from "./components/Link"
import ManagerLogin from "./components/ManagerLogin";
import ManagerDashboard from "./components/dashboard/ManagerDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import NavBar from "./components/NavBar";
import CreateEvents from "./components/CreateEvents";
import DisplayEvents from "./components/DisplayEvents";

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
            <NavBar/>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/registerManager" component={ManagerRegister}/>
            <Route exact path="/loginManager" component={ManagerLogin}/>
            <Route exact path="/loginAdmin" component={AdminLogin}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/managerDashboard" component={ManagerDashboard}/>
              <PrivateRoute exact path="/adminDashboard" component={AdminDashboard}/>
            </Switch>
            <Route exact path="/link" component={Link} />
            <Route exact path="/create-events" component={CreateEvents}/>
            <Route exact path="/display-events" component={DisplayEvents}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
