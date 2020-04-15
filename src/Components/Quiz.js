import React, { Component } from "react";
import UserNavBar from "./UserNavBar";
import ScoreBar from "./ScoreBar";
import BtnsBox from "./BtnsBox";
import QuizResult from "./QuizResult";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { connect } from "react-redux";
import KanaContext from "../contexts/KanaContext";
import Zoom from "@material-ui/core/Zoom";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
});

const Div = styled(Box)({
  fontSize: "10rem",
  margin: "0 0 ",
});
const CheckButton = styled(Button)({
  margin: "0.83rem 0",
  background: "rgba(24,173,54,0.6)",
  color: "#fff",
});
const Form = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "nowrap",
});
const InnerGrid = styled(Grid)({
  height: "100%",
});

class Quiz extends Component {
  static contextType = KanaContext;

  state = {
    wantToQuit: false,
    kanaTable: this.props.isUserChooseIncorrectAnswers
      ? this.props.syllabaryFromDatabase
      : this.context.kanaTable.sort(() => {
          return 0.5 - Math.random();
        }),
    kanaCounter: 0,
    correctAnswers: [],
    incorrectAnswers: [],
    answer: "",
    isEventBlocked: false,
    startDate: Date.now() / 1000,
    checked: true,
    style: {
      color: "#000",
    },
  };

  handleChangeInputValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // moving to next quiz card
  handleShowNextCharacter = () => {
    if (
      this.state.kanaCounter !== this.state.kanaTable.length - 1 &&
      this.state.answer !== "" &&
      this.state.isEventBlocked
    ) {
      this.setState({
        kanaCounter: this.state.kanaCounter + 1,
        answer: "",
        isEventBlocked: false,
        style: {
          color: "#000",
        },
      });
    } else {
      this.setState({
        kanaCounter: this.state.kanaCounter,
        style: {
          color: "#000",
        },
      });
    }
  };

  //checking answers
  handleCheckAnswer = (e) => {
    const {
      kanaTable,
      kanaCounter,
      correctAnswers,
      incorrectAnswers,
      answer,
      isEventBlocked,
    } = this.state;
    const { syllabary } = this.props.match.params;
    e.preventDefault();
    if (answer === kanaTable[kanaCounter].meaning && isEventBlocked === false) {
      const data = {
        id: kanaTable[kanaCounter].id,
        meaning: kanaTable[kanaCounter].meaning,
        [this.props.match.params.syllabary]: kanaTable[kanaCounter][syllabary],
        isCorrect: true,
      };
      this.setState({
        correctAnswers: [...correctAnswers, data],
        isEventBlocked: true,
        style: {
          color: "#008000",
        },
      });
    } else if (answer === "") {
      e.target = "disabled";
    } else if (
      answer !== kanaTable[kanaCounter].meaning &&
      isEventBlocked === false
    ) {
      const data = {
        id: kanaTable[kanaCounter].id,
        meaning: kanaTable[kanaCounter].meaning,
        [this.props.match.params.syllabary]: kanaTable[kanaCounter][syllabary],
        isCorrect: false,
      };
      this.setState({
        incorrectAnswers: [...incorrectAnswers, data],
        isEventBlocked: true,
        style: {
          color: "#FF0000",
        },
      });
    }
  };

  componentDidMount = () => {
    if (this.props.isUserChooseIncorrectAnswers) {
      this.setState({
        kanaTable: this.props.syllabaryFromDatabase,
      });
    } else {
      this.setState({
        kanaTable: this.context.kanaTable.slice().sort(() => {
          return 0.5 - Math.random();
        }),
      });
    }
  };

  render() {
    const {
      kanaTable,
      kanaCounter,
      answer,
      incorrectAnswers,
      correctAnswers,
      checked,
      style,
    } = this.state;
    const { syllabary } = this.props.match.params;

    if (
      incorrectAnswers.length + correctAnswers.length === kanaTable.length ||
      this.state.wantToQuit
    ) {
      return (
        <Zoom in={checked}>
          <QuizResult
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            chosenSyllabary={this.props.match.params.syllabary}
            time={this.state.startDate}
          />
        </Zoom>
      );
    } else {
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
                className="quiz-form"
                onSubmit={this.handleCheckAnswer}
              >
                <InnerGrid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <ScoreBar counter={this.state} />
                  <Div className="quiz-character" style={style}>
                    {kanaTable[kanaCounter][syllabary]}
                  </Div>
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
                  <CheckButton variant="contained" type="submit">
                    Sprawdź
                  </CheckButton>
                  <Button
                    variant="contained"
                    onClick={() => this.setState({ wantToQuit: true })}
                  >
                    Mam dość
                  </Button>
                </InnerGrid>
                <BtnsBox
                  onPrev={this.handleShowPrevCharacter}
                  onNext={this.handleShowNextCharacter}
                  componentToUse="quiz"
                />
              </Form>
            </OuterGrid>
          </Zoom>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isUserChooseIncorrectAnswers: state.auth.isUserChooseIncorrectAnswers,
    syllabaryFromDatabase: state.auth.syllabaryFromDatabase,
  };
};

export default connect(mapStateToProps)(Quiz);
