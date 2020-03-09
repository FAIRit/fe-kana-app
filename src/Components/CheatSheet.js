import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import SingleSign from "./SingleSign";
import Button from "@material-ui/core/Button";

class CheatSheet extends Component {
  state = {
    isHiraganaShown: false,
    isKatakanaShown: false
  };

  handleGetHiragana = () => {
    this.setState({
      isHiraganaShown: true,
      isKatakanaShown: false
    });
  };
  handleGetKatakana = () => {
    this.setState({
      isHiraganaShown: false,
      isKatakanaShown: true
    });
  };

  render() {
    const { isHiraganaShown, isKatakanaShown } = this.state;
    const { kanaTable } = this.props;
    return (
      <section className="cheat-sheet" onClick={this.handleFetchData}>
        <UserNavBar />
        <main className="cheat-sheet-container">
          <div className="cheat-sheet-btns">
            <Button variant="contained" onClick={this.handleGetHiragana}>
              Hiragana
            </Button>
            <Button variant="contained" onClick={this.handleGetKatakana}>
              Katakana
            </Button>
          </div>
          {isHiraganaShown &&
            kanaTable.map(kana => (
              <SingleSign
                kanaTable={kana.hiragana}
                kanaMeaning={kana.meaning}
                key={kana.id}
              />
            ))}
          {isKatakanaShown &&
            kanaTable.map(kana => (
              <SingleSign
                kanaTable={kana.katakana}
                kanaMeaning={kana.meaning}
                key={kana.id}
              />
            ))}
          <Button variant="contained" component={Link} to="/home">
            Powrót
          </Button>
        </main>
      </section>
    );
  }
}

export default CheatSheet;
