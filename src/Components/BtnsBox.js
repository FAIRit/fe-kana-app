import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class BtnsBox extends Component {
  handleNext = e => {
    e.preventDefault();
    this.props.onNext();
  };
  handlePrev = e => {
    e.preventDefault();
    this.props.onPrev();
  };

  render() {
    return (
      <div className="btns-box">
        {!this.props.componentToUse && (
          <Button variant="contained" onClick={this.handlePrev}>
            Poprzedni
          </Button>
        )}

        <Button variant="contained" onClick={this.handleNext}>
          Nastepny
        </Button>
        <Button variant="contained" component={Link} to="/home">
          Powrót
        </Button>
      </div>
    );
  }
}

export default BtnsBox;
