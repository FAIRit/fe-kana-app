import React, { Component } from "react";

class SingleSign extends Component {
  render() {
    return (
      <div className="sign-box">
        <p className="sign-box__character"></p>
        <span className="sign-box__meaning"></span>
      </div>
    );
  }
}

export default SingleSign;
