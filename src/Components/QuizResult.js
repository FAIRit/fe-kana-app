import React, { Component } from "react";
import UserNavBar from "./UserNavBar";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  marginTop: "15%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

class QuizResult extends Component {
  render() {
    return (
      <>
        <UserNavBar />
        <OuterGrid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <section className="result">
            <main className="result-container">
              <h2 className="result-container__title">
                Udało Ci się ukończyć quiz!
              </h2>
              <h3 className="result-container__subtitle">Twoj wynik to:</h3>
              <p className="result-container__score">
                {this.props.correctAnswers.length} / 46
              </p>
              <Button variant="contained" component={Link} to="/home">
                Powrót
              </Button>
            </main>
          </section>
        </OuterGrid>
      </>
    );
  }
}

export default QuizResult;
