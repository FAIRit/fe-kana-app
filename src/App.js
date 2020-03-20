import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Registration from "./Components/Registration";
import CheatSheet from "./Components/CheatSheet";
import FlashCards from "./Components/FlashCards";
import ChooseSyllabary from "./Components/ChooseSyllabary";
import ChooseCollection from "./Components/ChooseCollection";
import Quiz from "./Components/Quiz";
import { connect } from "react-redux";

class App extends Component {
  state = {
    kanaTable: []
  };

  componentDidMount = () => {
    fetch("http://localhost:3000/kana.json", {
      headers: {
        "content-type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        this.setState({
          kanaTable: data.kana
        });
      });
  };
  render() {
    const { kanaTable } = this.state;
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/register" component={Registration} />
          <Route
            path="/cheat-sheet"
            component={routeProps => (
              <CheatSheet {...routeProps} kanaTable={kanaTable} />
            )}
          />
          <Route exact path="/flash-cards" component={ChooseSyllabary} />
          <Route
            exact
            path="/flash-cards/:syllabary/choose-collection"
            component={ChooseCollection}
          />
          <Route
            exact
            path="/flash-cards/:syllabary"
            component={routeProps => (
              <FlashCards {...routeProps} kanaTable={kanaTable} />
            )}
          />
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
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isUserHasWrongHiraganaAnswers: state.auth.isUserHasWrongHiraganaAnswers,
    isUserHasWrongKatakanaAnswers: state.auth.isUserHasWrongKatakanaAnswers,
    isUserChooseIncorrectAnswers: state.auth.isUserChooseIncorrectAnswers
  };
};

export default connect(mapStateToProps)(App);
