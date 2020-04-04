import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Registration from "./Components/Registration";
import CheatSheet from "./Components/CheatSheet";
import FlashCards from "./Components/FlashCards";
import ChooseSyllabary from "./Components/ChooseSyllabary";
import ChooseCollection from "./Components/ChooseCollection";
import MyProfile from "./Components/MyProfile";
import Quiz from "./Components/Quiz";
import MyScores from "./Components/MyScores";

const AuthGuard = ({ children }) => {
  const user = useSelector(state => state.auth.user);
  return user === null ? <Redirect to="/" /> : children;
};

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Registration} />

        <AuthGuard>
          <Route path="/home" component={Home} />
          <Route path="/cheat-sheet" component={CheatSheet} />
          <Route exact path="/flash-cards" component={ChooseSyllabary} />
          <Route
            exact
            path="/flash-cards/:syllabary/choose-collection"
            component={ChooseCollection}
          />
          <Route exact path="/flash-cards/:syllabary" component={FlashCards} />
          <Route exact path="/quiz" component={ChooseSyllabary} />
          <Route
            exact
            path="/quiz/:syllabary/choose-collection"
            component={ChooseCollection}
          />
          <Route exact path="/quiz/:syllabary" component={Quiz} />
          <Route path="/my-profile" component={MyProfile} />
          <Route path="/my-score" component={MyScores} />
        </AuthGuard>
      </Switch>
    );
  }
}

export default App;
