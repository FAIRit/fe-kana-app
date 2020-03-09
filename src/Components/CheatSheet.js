import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import SingleSign from "./SingleSign";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";

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
    const OuterGrid = styled(Grid)({
      background: "rgb(255,255,255)",
      height: "80%",
      marginTop: "50px",
      borderRadius: "35px",
      boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
    });
    return (
      <>
        <UserNavBar />
        <OuterGrid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <section className="cheat-sheet" onClick={this.handleFetchData}>
            <main className="cheat-sheet-container">
              <div className="cheat-sheet-btns">
                <button
                  className="cheat-sheet-hiragana-btn"
                  onClick={this.handleGetHiragana}
                >
                  Hiragana
                </button>
                <button
                  className="cheat-sheet-katakana-btn"
                  onClick={this.handleGetKatakana}
                >
                  Katakana
                </button>
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
              <Link to="/home">
                <button className="back-to-home-btn">Powrót</button>
              </Link>
            </main>
          </section>
        </OuterGrid>
      </>
    );
  }
}

export default CheatSheet;
