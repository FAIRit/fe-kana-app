import React, { Component } from "react";
import UserNavBar from "./UserNavBar";
import BtnsBox from "./BtnsBox";

class FlashCards extends Component {
  state = {
    kanaTable: this.props.kanaTable.sort(() => {
      return 0.5 - Math.random();
    }),
    kanaCounter: 0,
    isMeaningShown: false
  };

  // showing characte's meaning
  handleShowMeaning = () => {
    this.setState({
      isMeaningShown: !this.state.isMeaningShown
    });
  };

  // moving to next flash card
  handleShowNextCharacter = () => {
    if (this.state.kanaCounter !== this.state.kanaTable.length - 1) {
      this.setState({
        kanaCounter: this.state.kanaCounter + 1
      });
    }
  };

  // moving to previous flash card
  handleShowPrevCharacter = () => {
    if (this.state.kanaCounter !== 0) {
      this.setState({
        kanaCounter: this.state.kanaCounter - 1
      });
    }
  };

  render() {
    const { kanaCounter, isMeaningShown, kanaTable } = this.state;
    return (
      <section className="flash-cards">
        <UserNavBar />
        <div className="flash-cards-container" onClick={this.handleShowMeaning}>
          <span className="flash-cards-id">{kanaCounter + 1}</span>
          {!isMeaningShown ? (
            <p className="flash-cards-character">
              {kanaTable[kanaCounter] &&
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
