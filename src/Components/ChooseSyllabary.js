import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";

class ChooseSyllabary extends Component {
  render() {
    const OuterGrid = styled(Grid)({
      background: "rgb(255,255,255)",
      height: "70%",
      marginTop: "90px",
      borderRadius: "35px",
      boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
    });
    return (
      <OuterGrid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <section className="syllabary">
          <div className="syllabary-container">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <h2 className="syllabary-header">Wybierz sylabariusz</h2>
              <div className="syllabary-inputs-box">
                <Link to={this.props.match.url + "/hiragana"}>Hiragana</Link>
                <Link to={this.props.match.url + "/katakana"}>Katakana</Link>
                <Link to="/home">Powrót</Link>
              </div>
            </Grid>
          </div>
        </section>
      </OuterGrid>
    );
  }
}

export default ChooseSyllabary;
