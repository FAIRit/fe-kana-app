import React, { Component } from "react";

class SingleSign extends Component {
  render() {
    const { kanaTable, kanaMeaning } = this.props;

    return (
      <div className="sign-box">
        <p className="sign-box__character">{kanaTable}</p>
        <span className="sign-box__meaning">{kanaMeaning}</span>
      </div>
    );
  }
}

export default SingleSign;
