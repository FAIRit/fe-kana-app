import React, { Component } from "react";

class ScoreBar extends Component {
  render() {
    return (
      <div className="score-bar">
        <span className="score-bar__incorrect-answers">
          {this.props.counter.incorrectAnswers.length}
        </span>
        <span className="score-bar__character-number">
          {this.props.counter.kanaCounter + 1}
        </span>
        <span className="score-bar__correct-answers">
          {this.props.counter.correctAnswers.length}
        </span>
      </div>
    );
  }
}

export default ScoreBar;
