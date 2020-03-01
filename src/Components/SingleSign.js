import React, { Component } from "react";

class SingleSign extends Component {
  render() {
    const { kanaTable, syllabary, kanaMeaning } = this.props;
    if (syllabary === "hiragana") {
      return (
        <div className="sign-box">
          <p className="sign-box__character">{kanaTable}</p>
          <span className="sign-box__meaning">{kanaMeaning}</span>
        </div>
      );
    } else {
      return (
        <div className="sign-box">
          <p className="sign-box__character">{kanaTable}</p>
          <span className="sign-box__meaning">{kanaMeaning}</span>
        </div>
      );
    }
  }
}

export default SingleSign;
