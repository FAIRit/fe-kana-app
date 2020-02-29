import React, { Component } from "react";

class SingleSign extends Component {
  render() {
    const { kanaTable, syllabary } = this.props;
    if (syllabary === "hiragana") {
      return (
        <div className="sign-box">
          <p className="sign-box__character">{kanaTable.hiragana}</p>
          <span className="sign-box__meaning">{kanaTable.meaning}</span>
        </div>
      );
    } else {
      return (
        <div className="sign-box">
          <p className="sign-box__character">{kanaTable.katakana}</p>
          <span className="sign-box__meaning">{kanaTable.meaning}</span>
        </div>
      );
    }
  }
}

export default SingleSign;
