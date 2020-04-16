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
  background: "rgb(0, 43, 78)",
});

const Div = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
const DivBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});
class BtnsBox extends Component {
  handleNext = (e) => {
    e.preventDefault();
    this.props.onNext();
  };
  handlePrev = (e) => {
    e.preventDefault();
    this.props.onPrev();
  };

  //restarting user's state's choice
  handleRestartUsersChoice = () => {
    this.props.changeToFalse();
  };

  render() {
    return (
      <Div className="btns-box">
        <DivBox>
          {this.props.componentToUse === "flashCards" && (
            <StyledButton variant="contained" onClick={this.handlePrev}>
              Poprzedni
            </StyledButton>
          )}
          <StyledButton variant="contained" onClick={this.handleNext}>
            Nastepny
          </StyledButton>
        </DivBox>
        <Button
          variant="contained"
          component={Link}
          to="/home"
          onClick={this.handleRestartUsersChoice}
          className="back-btn"
        >
          Powrót
        </Button>
      </Div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeToFalse: () => {
      dispatch(restartUserChoice());
    },
  };
};

export default connect(null, mapDispatchToProps)(BtnsBox);
