import React, { Component } from "react";
import UserNavBar from "./UserNavBar";
import ScoreBar from "./ScoreBar";
import BtnsBox from "./BtnsBox";

class Quiz extends Component {
  render() {
    return (
      <section className="quiz">
        <UserNavBar />
        <main className="quiz-container">
          <ScoreBar />
          <p className="quiz-character"></p>
          <label className="quiz-answer-label">
            <input type="text" placeholder="Wpisz odpowiedź" />
          </label>
        </main>
        <BtnsBox />
      </section>
    );
  }
}

export default Quiz;
