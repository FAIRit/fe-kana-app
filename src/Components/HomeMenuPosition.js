import React, { Component } from "react";

class HomeMenuPosition extends Component {
  render() {
    return (
      <div className="menu-position-box">
        <h2 className="menu-position-title">{this.props.title}</h2>
        <p className="menu-position-content">{this.props.content}</p>
      </div>
    );
  }
}

export default HomeMenuPosition;
