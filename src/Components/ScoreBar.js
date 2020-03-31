import React, { Component } from "react";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const Span = styled(Box)({
  display: "inline-block",
  fontSize: "2rem",
  width: "80px",
  textAlign: "center"
});
const OuterGrid = styled(Grid)({
  width: "100%"
});

class ScoreBar extends Component {
  render() {
    const {
      incorrectAnswers,
      correctAnswers,
      kanaCounter
    } = this.props.counter;
    return (
      <OuterGrid
        container
        direction="row"
        justify="space-around"
        className="score-bar"
      >
        <Span component="span" className="score-bar__incorrect-answers">
          {incorrectAnswers.length}
        </Span>
        <Span component="span" className="score-bar__character-number">
          {kanaCounter + 1}
        </Span>
        <Span component="span" className="score-bar__correct-answers">
          {correctAnswers.length}
        </Span>
      </OuterGrid>
    );
  }
}

export default ScoreBar;
