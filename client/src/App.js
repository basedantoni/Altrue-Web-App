import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/Register";
import { PostList } from "./components/PostList";

function App() {
  return (
    <div className="App">
      <Register/>
      <PostList/>
    </div>
  );
}

export default App;
