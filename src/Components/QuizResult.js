import React, { Component } from "react";
import UserNavBar from "./UserNavBar";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { db } from "../Firebase/firebase";
import { connect } from "react-redux";
import Zoom from "@material-ui/core/Zoom";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

const Form = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});
const H2 = styled(Box)({
  fontSize: "2rem",
  textAlign: "center"
});
const StyledButton = styled(Button)({
  margin: "0 0.83rem 0.83rem 0.83rem",
  color: "#fff",
  background: "#3f51b5"
});
const StyledLink = styled(Box)({
  margin: "0 0.83rem 0.83rem 0.83rem"
});

const P = styled(Box)({
  fontSize: "4rem",
  margin: "0.83rem 0"
});

class QuizResult extends Component {
  state = {
    correctAnswers: this.props.correctAnswers,
    incorrectAnswers: this.props.incorrectAnswers,
    isResultSubmitted: false,
    timePerQuiz: "",
    checked: true
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

    if (
      this.props.chosenSyllabary === "hiragana" &&
      (this.state.correctAnswers.length >= 3 ||
        this.state.incorrectAnswers.length >= 3)
    ) {
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
        isResultSubmitted: true
      });
    } else if (
      this.props.chosenSyllabary === "katakana" &&
      (this.state.correctAnswers.length >= 3 ||
        this.state.incorrectAnswers.length >= 3)
    ) {
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
        isResultSubmitted: true
      });
    } else {
      this.setState({
        isResultSubmitted: true
      });
    }
  };

  handleResetAnswersState = e => {
    e.preventDefault();
    this.setState({
      correctAnswers: [],
      incorrectAnswers: []
    });
  };

  render() {
    const {
      correctAnswers,
      incorrectAnswers,
      isResultSubmitted,
      checked
    } = this.state;

    let sum = correctAnswers.length + incorrectAnswers.length;
    return (
      <>
        <UserNavBar />
        <Zoom in={checked}>
          <OuterGrid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Form
              component="form"
              className="result-container"
              onSubmit={this.handleSaveScore}
            >
              <H2 component="h2" className="result-container__title">
                Udało Ci się ukończyć quiz!
              </H2>
              <h3 className="result-container__subtitle">Twój wynik to:</h3>
              <P component="p" className="result-container__score">
                {correctAnswers.length}/{sum}
              </P>
              {!isResultSubmitted ? (
                <StyledButton variant="contained" type="submit">
                  Zapisz swój wynik!
                </StyledButton>
              ) : (
                <StyledLink onClick={this.handleResetAnswersState}>
                  <Button variant="contained" component={Link} to="/home">
                    Powrót do ekranu głównego
                  </Button>
                </StyledLink>
              )}
            </Form>
          </OuterGrid>
        </Zoom>
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
