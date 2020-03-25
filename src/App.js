import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Registration from "./Components/Registration";
import CheatSheet from "./Components/CheatSheet";
import FlashCards from "./Components/FlashCards";
import ChooseSyllabary from "./Components/ChooseSyllabary";
import ChooseCollection from "./Components/ChooseCollection";
import MyProfile from "./Components/MyProfile";
import Quiz from "./Components/Quiz";
import { connect } from "react-redux";
import KanaContext from "./contexts/KanaContext";

class App extends Component {
  static contextType = KanaContext;

  render() {
    const { kanaTable } = this.context;
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/register" component={Registration} />
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
        <Route
          path="/quiz/:syllabary"
          component={routeProps => (
            <Quiz {...routeProps} kanaTable={kanaTable} />
          )}
        />
        <Route path="/my-profile" component={MyProfile} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isUserHasWrongHiraganaAnswers: state.auth.isUserHasWrongHiraganaAnswers,
    isUserHasWrongKatakanaAnswers: state.auth.isUserHasWrongKatakanaAnswers,
    isUserChooseIncorrectAnswers: state.auth.isUserChooseIncorrectAnswers,
    imageUrl: state.auth.imageUrl
  };
};

export default connect(mapStateToProps)(App);
