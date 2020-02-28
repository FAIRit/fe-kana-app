import React, { Component } from "react";
import UserNavBar from "./UserNavBar";

class CheatSheet extends Component {
  // pobranie wartosci z kana.json

  handleFetchData = () => {
    fetch("http://localhost:3000/kana.json", {
      headers: {
        "content-type": "application/json"
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        // console.log(data.kana);
        this.handleShowData(data.kana);
      });
  };

  handleShowData = data => {
    console.log(data);
  };

  render() {
    return (
      <section className="cheat-sheet" onClick={this.handleFetchData}>
        <UserNavBar />
        <main className="cheat-sheet-container"></main>
      </section>
    );
  }
}

export default CheatSheet;
