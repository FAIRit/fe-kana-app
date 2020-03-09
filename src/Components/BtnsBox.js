import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

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
        {!this.props.componentToUse && (
          // <button className="btn-prev" onClick={this.handlePrev}>
          //   Poprzedni
          // </button>
          <Button variant="contained" onClick={this.handlePrev}>
            Poprzedni
          </Button>
        )}

        {/* <button className="btn-next" onClick={this.handleNext}>
          Nastepny
        </button> */}
        <Button variant="contained" onClick={this.handleNext}>
          Następny
        </Button>
        {/* <Link to="/home">
          <button className="back-to-home-btn">Powrót</button>
        </Link> */}
        <Button variant="contained" component={Link} to="/home">
          Powrót
        </Button>
      </div>
    );
  }
}

export default BtnsBox;
