import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Registration from "./Components/Registration";

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/register" component={Registration} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;
