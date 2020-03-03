import React, { Component } from "react";
import { Link } from "react-router-dom";

class ChooseSyllabary extends Component {
  render() {
    return (
      <section className="syllabary">
        <div className="syllabary-container">
          <h2 className="syllabary-header">Wybierz sylabariusz</h2>
          <div className="syllabary-inputs-box">
            <Link to={this.props.match.url + "/hiragana"}>Hiragana</Link>
            <Link to={this.props.match.url + "/katakana"}>Katakana</Link>
          </div>
        </div>
      </section>
    );
  }
}

export default ChooseSyllabary;
