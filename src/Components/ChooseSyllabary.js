import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

class ChooseSyllabary extends Component {
  render() {
    return (
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
    );
  }
}

export default ChooseSyllabary;
