import React, { Component } from "react";
import UserNavBar from "./UserNavBar";
import ScoreBar from "./ScoreBar";
import BtnsBox from "./BtnsBox";

class Quiz extends Component {
  state = {
    kanaTable: this.props.kanaTable.sort(() => {
      return 0.5 - Math.random();
    }),
    kanaCounter: 0,
    correctAnswers: [],
    incorrectAnswers: [],
    answer: ""
  };

  handleGetAnswer = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // moving to next flash card
  handleShowNextCharacter = () => {
    if (this.state.kanaCounter !== this.state.kanaTable.length - 1) {
      this.setState({
        kanaCounter: this.state.kanaCounter + 1,
        answer: ""
      });
    }
  };

  // moving to previous flash card
  handleShowPrevCharacter = () => {
    if (this.state.kanaCounter !== 0) {
      this.setState({
        kanaCounter: this.state.kanaCounter - 1,
        answer: ""
      });
    }
  };

  handleCheckAnswer = e => {
    e.target.previousElementSibling.value = "";
    if (
      this.state.answer === this.state.kanaTable[this.state.kanaCounter].meaning
    ) {
      console.log("Poprawna odpowiedź!");
    } else {
      console.log("Źle");
    }
  };

  render() {
    const { kanaTable, kanaCounter } = this.state;
    return (
      <section className="quiz">
        <UserNavBar />
        <main className="quiz-container">
          <ScoreBar counter={this.state} />
          <div className="quiz-character">
            {kanaTable[kanaCounter][this.props.match.params.syllabary]}
          </div>
          <label className="quiz-answer-label">
            <input
              type="text"
              placeholder="Wpisz odpowiedź"
              name="answer"
              onChange={this.handleGetAnswer}
            />
            <button className="quiz-submit" onClick={this.handleCheckAnswer}>
              Spradź
            </button>
          </label>
        </main>
        <BtnsBox
          onPrev={this.handleShowPrevCharacter}
          onNext={this.handleShowNextCharacter}
        />
      </section>
    );
  }
}

export default Quiz;
