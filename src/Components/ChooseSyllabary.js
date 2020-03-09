import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

class ChooseSyllabary extends Component {
  render() {
    return (
      <section className="syllabary">
        <div className="syllabary-container">
          <h2 className="syllabary-header">Wybierz sylabariusz</h2>
          <div className="syllabary-inputs-box">
            <Button
              variant="contained"
              component={RouterLink}
              to={this.props.match.url + "/hiragana"}
            >
              Hiragana
            </Button>
            <Button
              variant="contained"
              component={RouterLink}
              to={this.props.match.url + "/katakana"}
            >
              Katakana
            </Button>
            <Link component={RouterLink} to="/home">
              Powrót
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default ChooseSyllabary;
