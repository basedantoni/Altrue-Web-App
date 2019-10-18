import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
      </div>
    </Router>
  );
}

export default App;
