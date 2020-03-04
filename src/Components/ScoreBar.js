import React, { Component } from "react";

class ScoreBar extends Component {
  render() {
    return (
      <div className="score-bar">
        <span className="score-bar__incorrect-answers"></span>
        <span className="score-bar__character-number"></span>
        <span className="score-bar__correct-answers"></span>
      </div>
    );
  }
}

export default ScoreBar;
