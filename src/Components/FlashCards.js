import React, { Component } from "react";
import UserNavBar from "./UserNavBar";
import BtnsBox from "./BtnsBox";

class FlashCards extends Component {
  state = {
    kanaTable: [],
    arrayCounter: 0,
    counter: 0
  };
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
        let elements = data.kana;
        elements.sort(() => {
          return 0.5 - Math.random();
        });
        this.setState({
          kanaTable: elements
        });

        // console.log(this.state.kanaTable[this.state.arrayCounter]);
      });
  };

  handleShowNextCharacter = () => {};

  render() {
    // const { kanaTable } = this.state;
    console.log(this.state.kanaTable);
    return (
      <section className="flash-cards">
        <UserNavBar />
        <div className="flash-cards-container">
          <span className="flash-cards-id"></span>
          <p className="flash-cards-character">
            {/* {this.state.kanaTable[this.state.arrayCounter].hiragana} */}
          </p>
        </div>
        <BtnsBox />
      </section>
    );
  }
}

export default FlashCards;
