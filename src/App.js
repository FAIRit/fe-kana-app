import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Registration from "./Components/Registration";
import CheatSheet from "./Components/CheatSheet";
import FlashCards from "./Components/FlashCards";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/register" component={Registration} />
          <Route path="/cheat-sheet" component={CheatSheet} />
          <Route path="/flash-cards" component={FlashCards} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
