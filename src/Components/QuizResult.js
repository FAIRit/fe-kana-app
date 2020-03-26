import React, { Component } from "react";
import UserNavBar from "./UserNavBar";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { db } from "../Firebase/firebase";
import { connect } from "react-redux";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  marginTop: "15%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

class QuizResult extends Component {
  state = {
    correctAnswers: this.props.correctAnswers,
    incorrectAnswers: this.props.incorrectAnswers,
    isResultSubmitted: false,
    timePerQuiz: ""
  };

  componentDidMount = () => {
    this.handleChangeEndDate();
  };

  handleChangeEndDate = () => {
    const endDate = Date.now() / 1000;
    //time in seconds
    const timeInSeconds = endDate - this.props.time;
    let seconds = timeInSeconds.toFixed(0);
    //minutes
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    this.setState({
      timePerQuiz: `${hours}:${minutes}:${seconds}`
    });
  };

  handleSaveScore = e => {
    e.preventDefault();

    if (this.props.chosenSyllabary === "hiragana") {
      const correctHiraganaScore = db
        .ref("hiraganaCorrectAnswers/" + this.props.user)
        .push();
      correctHiraganaScore.set({
        answers: this.state.correctAnswers,
        timePerQuiz: this.state.timePerQuiz
      });
      const incorrectHiraganaScore = db
        .ref("hiraganaIncorrectAnswers/" + this.props.user)
        .push();
      incorrectHiraganaScore.set({
        answers: this.state.incorrectAnswers,
        timePerQuiz: this.state.timePerQuiz
      });
      this.setState({
        correctAnswers: [],
        incorrectAnswers: [],
        isResultSubmitted: true
      });
    } else if (this.props.chosenSyllabary === "katakana") {
      const correctKatakanaScore = db
        .ref("katakanaCorrectAnswers/" + this.props.user)
        .push();
      correctKatakanaScore.set({
        answers: this.state.correctAnswers,
        timePerQuiz: this.state.timePerQuiz
      });
      const incorrectKatakanaScore = db
        .ref("katakanaIncorrectAnswers/" + this.props.user)
        .push();
      incorrectKatakanaScore.set({
        answers: this.state.incorrectAnswers,
        timePerQuiz: this.state.timePerQuiz
      });
      this.setState({
        correctAnswers: [],
        incorrectAnswers: [],
        isResultSubmitted: true
      });
    }
  };

  render() {
    const { correctAnswers, incorrectAnswers, isResultSubmitted } = this.state;

    let sum = correctAnswers.length + incorrectAnswers.length;
    return (
      <>
        <UserNavBar />
        <OuterGrid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <section className="result">
            <form className="result-container" onSubmit={this.handleSaveScore}>
              <h2 className="result-container__title">
                Udało Ci się ukończyć quiz!
              </h2>
              <h3 className="result-container__subtitle">Twoj wynik to:</h3>
              <p className="result-container__score">
                {correctAnswers.length}/{sum}
              </p>
              {!isResultSubmitted ? (
                <Button variant="contained" type="submit">
                  Zapisz swój wynik!
                </Button>
              ) : (
                <Button variant="contained" component={Link} to="/home">
                  Powrót do ekranu głównego
                </Button>
              )}
            </form>
          </section>
        </OuterGrid>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user.uid
  };
};

export default connect(mapStateToProps)(QuizResult);
