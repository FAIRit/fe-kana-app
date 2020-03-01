import React, { Component } from "react";
import { Link } from "react-router-dom";

class BtnsBox extends Component {
  render() {
    return (
      <div className="btns-box">
        <button className="btn-prev">Poprzedni</button>
        <button className="btn-next">Nastepny</button>
        <Link to="/home">
          <button className="back-to-home-btn">Powrót</button>
        </Link>
      </div>
    );
  }
}

export default BtnsBox;
