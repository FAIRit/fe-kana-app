import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import { restartUserChoice } from "../Redux/actions/auth";

const StyledButton = styled(Button)({
  margin: "0 0.83rem 0.83rem 0.83rem",
  color: "#fff",
  background: "#3f51b5"
});

const Div = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});
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
      <Div className="btns-box">
        <div>
          {this.props.componentToUse === "flashCards" && (
            <StyledButton variant="contained" onClick={this.handlePrev}>
              Poprzedni
            </StyledButton>
          )}
          <StyledButton variant="contained" onClick={this.handleNext}>
            Nastepny
          </StyledButton>
        </div>
        <Button
          variant="contained"
          component={Link}
          to="/home"
          onClick={this.handleRestartUsersChoice}
        >
          Powrót
        </Button>
      </Div>
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
