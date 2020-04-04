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
    timeInSeconds: 0,
    timeFromDatabase: 0,
    checked: true
  };

  componentDidMount = () => {
    // quiz time in seconds
    const endDate = Date.now() / 1000;
    this.setState({
      timeInSeconds: parseInt((endDate - this.props.time).toFixed(0))
    });

    //check if user has saved quiz time
    const totalTime = db
      .ref("users")
      .child(this.props.user)
      .child("quizes")
      .child(this.props.chosenSyllabary)
      .child("totalTime");

    // TODO get rid of typeof string after finishing task
    totalTime.once("value", snapshot => {
      if (!snapshot.exists() || typeof snapshot.val() === "string") {
        this.setState({
          timeFromDatabase: 0
        });
      } else {
        this.setState({
          timeFromDatabase: snapshot.val()
        });
      }
    });
  };

  handleSaveScore = e => {
    e.preventDefault();

    if (this.props.chosenSyllabary === "hiragana") {
      //saving last user's incorrect answers into user collection
      const { incorrectAnswers } = this.state;
      const savedIncorrectAnswers = db
        .ref("users")
        .child(this.props.user)
        .child("quizes")
        .child(this.props.chosenSyllabary);

      const mistakes = [];
      incorrectAnswers.forEach(element => {
        mistakes.push({ [element["id"]]: true });
      });

      let sum = this.state.timeFromDatabase + this.state.timeInSeconds;
      savedIncorrectAnswers.set({
        mistakes,
        totalTime: sum
      });

      //rest
      const incorrectHiraganaScore = db
        .ref("hiraganaIncorrectAnswers/" + this.props.user)
        .push();
      incorrectHiraganaScore.set({
        answers: this.state.incorrectAnswers
      });
      this.setState({
        isResultSubmitted: true
      });
    } else {
      //saving to user's incorrect answers
      const { incorrectAnswers } = this.state;
      const savedIncorrectAnswers = db
        .ref("users")
        .child(this.props.user)
        .child("quizes")
        .child(this.props.chosenSyllabary);

      const mistakes = [];
      incorrectAnswers.forEach(element => {
        mistakes.push({ [element["id"]]: true });
      });

      let sum = this.state.timeFromDatabase + this.state.timeInSeconds;
      savedIncorrectAnswers.set({
        mistakes,
        totalTime: sum
      });

      //rest
      const incorrectKatakanaScore = db
        .ref("katakanaIncorrectAnswers/" + this.props.user)
        .push();
      incorrectKatakanaScore.set({
        answers: this.state.incorrectAnswers
      });
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
