import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        <button className="btn-prev" onClick={this.handlePrev}>
          Poprzedni
        </button>
        <button className="btn-next" onClick={this.handleNext}>
          Nastepny
        </button>
        <Link to="/home">
          <button className="back-to-home-btn">Powrót</button>
        </Link>
      </div>
    );
  }
}

export default BtnsBox;
