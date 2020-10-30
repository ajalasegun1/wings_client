import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import Signup from "./components/Signup"
import Signin from "./components/Signin"

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route  path="/signup" component={Signup} />
          <Route  path="/signin" component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
