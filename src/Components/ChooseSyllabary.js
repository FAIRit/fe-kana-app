import React, { Component } from "react";
import { Link } from "react-router-dom";

class ChooseSyllabary extends Component {
  state = {
    isHiraganaChosen: false,
    isKatakanaChosen: false,
    isChosen: false
  };

  handleChooseHiragana = () => {
    this.setState({
      isHiraganaChosen: true,
      isKatakanaChosen: false,
      isChosen: true
    });
  };

  handleChooseKatakana = () => {
    this.setState({
      isHiraganaChosen: false,
      isKatakanaChosen: true,
      isChosen: true
    });
  };
  // componentWillUnmount = () => {
  //   this.setState({
  //     isHiraganaChosen: false,
  //     isKatakanaChosen: false,
  //     isChosen: false
  //   });
  // };

  render() {
    return (
      <section className="syllabary">
        <div className="syllabary-container">
          <h2 className="syllabary-header">Wybierz sylabariusz</h2>
          <div className="syllabary-inputs-box">
            <label className="syllabary-inputs-box__label">
              <input
                type="radio"
                name="syllabary"
                value="syllabary"
                onClick={this.handleChooseHiragana}
              />
              Hiragana
            </label>
            <label className="syllabary-inputs-box__label">
              <input
                type="radio"
                name="syllabary"
                value="syllabary"
                onClick={this.handleChooseKatakana}
              />
              Katakana
            </label>
          </div>
        </div>
        {this.state.isChosen ? (
          <Link to="/flash-cards">
            <button className="syllabary-btn">Zaczynamy!</button>
          </Link>
        ) : (
          <Link to="/home">
            <button className="syllabary-btn">Zaczynamy!</button>
          </Link>
        )}
      </section>
    );
  }
}

export default ChooseSyllabary;
