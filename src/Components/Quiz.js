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

  handleChangeInputValue = e => {
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

  //checking answers
  handleCheckAnswer = e => {
    const {
      kanaTable,
      kanaCounter,
      correctAnswers,
      incorrectAnswers,
      answer
    } = this.state;
    const { syllabary } = this.props.match.params;
    e.preventDefault();
    if (answer === kanaTable[kanaCounter].meaning) {
      const data = {
        syllabary: syllabary,
        meaning: kanaTable[kanaCounter].meaning,
        character: kanaTable[kanaCounter][syllabary]
      };
      this.setState({
        correctAnswers: [...correctAnswers, data]
      });
    } else {
      const data = {
        syllabary: syllabary,
        meaning: kanaTable[kanaCounter].meaning,
        character: kanaTable[kanaCounter][syllabary]
      };
      this.setState({
        incorrectAnswers: [...incorrectAnswers, data]
      });
    }
  };

  render() {
    const { kanaTable, kanaCounter, answer } = this.state;
    const { syllabary } = this.props.match.params;
    return (
      <section className="quiz">
        <UserNavBar />
        <main className="quiz-container">
          <ScoreBar counter={this.state} />
          <form className="quiz-form" onSubmit={this.handleCheckAnswer}>
            <div className="quiz-character">
              {kanaTable[kanaCounter][syllabary]}
            </div>
            <label className="quiz-answer-label" htmlFor="answer">
              <input
                type="text"
                placeholder="Wpisz odpowiedź"
                value={answer}
                name="answer"
                onChange={this.handleChangeInputValue}
                id="answer"
              />
            </label>
            <button className="quiz-submit">Sprawdź</button>
          </form>
        </main>
        <BtnsBox
          onPrev={this.handleShowPrevCharacter}
          onNext={this.handleShowNextCharacter}
          componentToUse="quiz"
        />
      </section>
    );
  }
}

export default Quiz;
