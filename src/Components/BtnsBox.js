import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { restartUserChoice } from "../Redux/actions/auth";

class BtnsBox extends Component {
  handleNext = e => {
    e.preventDefault();
    this.props.onNext();
  };
  handlePrev = e => {
    e.preventDefault();
    this.props.onPrev();
  };

  handleRestartUsersChoice = () => {
    this.props.changeToFalse();
  };

  render() {
    return (
      <div className="btns-box">
        {this.props.componentToUse === "flashCards" && (
          <Button variant="contained" onClick={this.handlePrev}>
            Poprzedni
          </Button>
        )}
        <Button variant="contained" onClick={this.handleNext}>
          Nastepny
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/home"
          onClick={this.handleRestartUsersChoice}
        >
          Powrót
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeToFalse: () => {
      dispatch(restartUserChoice());
    }
  };
};

export default connect(null, mapDispatchToProps)(BtnsBox);
