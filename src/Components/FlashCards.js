import React, { Component } from "react";
import UserNavBar from "./UserNavBar";
import BtnsBox from "./BtnsBox";

class FlashCards extends Component {
  state = {
    kanaTable: [],
    kanaCounter: 0,
    counter: 1,
    isMeaningShown: false
  };

  // fetching kana data
  componentDidMount = () => {
    fetch("http://localhost:3000/kana.json", {
      headers: {
        "content-type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        this.setState({
          kanaTable: data.kana.sort(() => {
            return 0.5 - Math.random();
          })
        });
      });
  };

  // showing characte's meaning
  handleShowMeaning = () => {
    this.setState({
      isMeaningShown: !this.state.isMeaningShown
    });
  };

  // moving to next flash card
  handleShowNextCharacter = () => {
    if (this.state.kanaCounter !== 45) {
      this.setState({
        kanaCounter: this.state.kanaCounter + 1,
        counter: this.state.counter + 1
      });
    } else {
      this.setState({
        kanaCounter: this.state.kanaCounter,
        counter: this.state.counter
      });
    }
  };

  // moving to previous flash card
  handleShowPrevCharacter = () => {
    if (this.state.kanaCounter !== 0) {
      this.setState({
        kanaCounter: this.state.kanaCounter - 1,
        counter: this.state.counter - 1
      });
    } else {
      this.setState({
        kanaCounter: this.state.kanaCounter,
        counter: this.state.counter
      });
    }
  };

  render() {
    const { kanaTable, kanaCounter, isMeaningShown } = this.state;
    return (
      <section className="flash-cards">
        <UserNavBar />
        <div className="flash-cards-container" onClick={this.handleShowMeaning}>
          <span className="flash-cards-id">{this.state.counter}</span>
          {!isMeaningShown ? (
            <p className="flash-cards-character">
              {kanaTable[this.state.kanaCounter] &&
                kanaTable[kanaCounter][this.props.match.params.syllabary]}
            </p>
          ) : (
            <p className="flash-cards-meaning">
              {kanaTable[kanaCounter] && kanaTable[kanaCounter].meaning}
            </p>
          )}
        </div>
        <BtnsBox
          onPrev={this.handleShowPrevCharacter}
          onNext={this.handleShowNextCharacter}
        />
      </section>
    );
  }
}

export default FlashCards;
