import React, { Component } from "react";

class FormInput extends Component {
  render() {
    return (
      <label className="form-label">
        <span className="form-label-title">{this.props.title}</span>
        <input className="form-label-input" type={this.props.type}></input>
      </label>
    );
  }
}

export default FormInput;
