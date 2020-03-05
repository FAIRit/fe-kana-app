import React, { Component } from "react";

class ScoreBar extends Component {
  render() {
    const {
      incorrectAnswers,
      correctAnswers,
      kanaCounter
    } = this.props.counter;
    return (
      <div className="score-bar">
        <span className="score-bar__incorrect-answers">
          {incorrectAnswers.length}
        </span>
        <span className="score-bar__character-number">{kanaCounter + 1}</span>
        <span className="score-bar__correct-answers">
          {correctAnswers.length}
        </span>
      </div>
    );
  }
}

export default ScoreBar;
