import React, { Component } from "react";

class HomeMenuPosition extends Component {
  //displaying chosing syllabary component after clicking on FlashCards and Quiz
  handleClick = e => {
    if (this.props.title === "Ściągawka") {
      e.stopPropagation();
    } else {
      this.props.event();
    }
  };
  render() {
    return (
      <div className="menu-position-box" onClick={this.handleClick}>
        <h2 className="menu-position-title">{this.props.title}</h2>
        <p className="menu-position-content">{this.props.content}</p>
      </div>
    );
  }
}

export default HomeMenuPosition;
