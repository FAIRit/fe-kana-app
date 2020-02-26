import React, { Component } from "react";

class ChooseSyllabary extends Component {
  render() {
    return (
      <>
        <section className="syllabary">
          <div className="syllabary-container">
            <h2 className="syllabary-header">Wybierz sylabariusz</h2>
            <div className="syllabary-inputs-box">
              <label className="syllabary-inputs-box__label">
                <input type="radio" name="syllabary" value="syllabary" />
                Hiragana
              </label>
              <label className="syllabary-inputs-box__label">
                <input type="radio" name="syllabary" value="syllabary" />
                Katakana
              </label>
            </div>
          </div>
          <button className="syllabary-btn">Zaczynamy!</button>
        </section>
      </>
    );
  }
}

export default ChooseSyllabary;
