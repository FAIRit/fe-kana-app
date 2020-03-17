import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import ScoreBar from "./ScoreBar";
import BtnsBox from "./BtnsBox";
import QuizResult from "./QuizResult";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { connect } from "react-redux";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  marginTop: "15%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

class Quiz extends Component {
  state = {
    kanaTable: this.props.kanaTable.sort(() => {
      return 0.5 - Math.random();
    }),
    kanaCounter: 0,
    correctAnswers: [],
    incorrectAnswers: [],
    answer: "",
    isEventBlocked: false
  };

  handleChangeInputValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // moving to next quiz card
  handleShowNextCharacter = () => {
    if (
      this.state.kanaCounter !== this.state.kanaTable.length - 1 &&
      this.state.answer !== ""
    ) {
      this.setState({
        kanaCounter: this.state.kanaCounter + 1,
        answer: "",
        isEventBlocked: false
      });
    } else if (this.state.kanaCounter === 46) {
      this.setState({
        kanaCounter: this.state.kanaCounter
      });
    }
  };

  //checking answers
  handleCheckAnswer = e => {
    const {
      kanaTable,
      kanaCounter,
      correctAnswers,
      incorrectAnswers,
      answer,
      isEventBlocked
    } = this.state;
    const { syllabary } = this.props.match.params;
    e.preventDefault();
    if (answer === kanaTable[kanaCounter].meaning && isEventBlocked === false) {
      const data = {
        syllabary: syllabary,
        meaning: kanaTable[kanaCounter].meaning,
        character: kanaTable[kanaCounter][syllabary]
      };
      this.setState({
        correctAnswers: [...correctAnswers, data],
        isEventBlocked: true
      });
    } else if (answer === "") {
      e.target = "disabled";
    } else if (
      answer !== kanaTable[kanaCounter].meaning &&
      isEventBlocked === false
    ) {
      const data = {
        syllabary: syllabary,
        meaning: kanaTable[kanaCounter].meaning,
        character: kanaTable[kanaCounter][syllabary]
      };
      this.setState({
        incorrectAnswers: [...incorrectAnswers, data],
        isEventBlocked: true
      });
    }
  };

  render() {
    const {
      kanaTable,
      kanaCounter,
      answer,
      incorrectAnswers,
      correctAnswers
    } = this.state;
    const { syllabary } = this.props.match.params;
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else if (incorrectAnswers.length + correctAnswers.length === 46) {
      return <QuizResult correctAnswers={correctAnswers} />;
    } else {
      return (
        <>
          <UserNavBar />
          <OuterGrid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <section className="quiz">
              <main className="quiz-container">
                <form className="quiz-form" onSubmit={this.handleCheckAnswer}>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <ScoreBar counter={this.state} />
                    <div className="quiz-character">
                      {kanaTable[kanaCounter][syllabary]}
                    </div>
                    <label className="quiz-answer-label" htmlFor="answer">
                      <Input
                        type="text"
                        placeholder="Wpisz odpowiedź"
                        value={answer}
                        name="answer"
                        onChange={this.handleChangeInputValue}
                        id="answer"
                      ></Input>
                    </label>
                    <Button variant="contained" type="submit">
                      Sprawdź
                    </Button>
                  </Grid>
                </form>
              </main>
              <BtnsBox
                onPrev={this.handleShowPrevCharacter}
                onNext={this.handleShowNextCharacter}
                componentToUse="quiz"
              />
            </section>
          </OuterGrid>
        </>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Quiz);
