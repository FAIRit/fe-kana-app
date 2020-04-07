import React, { Component } from "react";
import firebase from "firebase";
import KanaContext from "../contexts/KanaContext";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "80%",
  width: "100%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
});
const SectionGrid = styled(Grid)({});
const Div = styled(Box)({});

const StyledButton = styled(Button)({
  background: "#3f51b5",
  color: "#fff",
});

class MyScores extends Component {
  static contextType = KanaContext;
  state = {
    checked: true,
    kanaTable: this.context.kanaTable,
    clicked: "hiragana",
    totalQuizes: 0,
  };

  handleShowHiragana = () => {
    this.setState({
      clicked: "hiragana",
    });
    this.handleShowData();
  };

  handleShowKatakana = () => {
    this.setState({
      clicked: "katakana",
    });
    this.handleShowData();
  };

  handleShowData = () => {
    const handleGetData = (user) => {
      const { uid } = user;
      firebase
        .database()
        .ref("historicalQuizes")
        .child(uid)
        .child(this.state.clicked)
        .once("value", (snapshot) => {
          this.handleGetDataFromSnapshot(snapshot);
        });
    };
    firebase.auth().onAuthStateChanged(handleGetData);
  };

  handleGetDataFromSnapshot = (data) => {
    const quizes = data.val();
    console.log(quizes);
    //number of done quizes per syllabary
    const charmaps = Object.values(quizes);
    console.log(charmaps);
    this.setState({
      totalQuizes: charmaps.length,
    });

    //assigment id and value of character
    const chars = charmaps.flatMap((charmap) =>
      Object.entries(charmap).map(([charId, value]) => ({ charId, value }))
    );
    //collect the sum of answers per character
    const distribution = chars.reduce((result, next) => {
      if (result[next.charId] === undefined) {
        result[next.charId] = { correct: 0, incorrect: 0 };
      }

      if (next.value === true) {
        result[next.charId].correct += 1;
      } else {
        result[next.charId].incorrect += 1;
      }
      return result;
    }, {});
    const characters = [];
    console.log(distribution);
    this.state.kanaTable.forEach((element, i) => {
      //do skonczenia
      const data = {
        id: element["id"],
        [this.state.clicked]: element[this.state.clicked],
        answersPercentage:
          (
            (distribution[element["id"]]["correct"] / this.state.totalQuizes) *
            100
          ).toFixed(0) + "%",
      };
      characters.push(data);
      // console.log(
      //   "id elementu: ",
      //   element["hiragana"],
      //   "Liczba poprawnych odpowiedzi",
      //   distribution[element["id"]]["correct"]
      // );
    });
    console.log(characters);
  };

  render() {
    const { checked } = this.state;
    return (
      <Zoom in={checked}>
        <OuterGrid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <SectionGrid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            className="my-scores"
          >
            <Div>
              <StyledButton
                variant="contained"
                name="hiragana"
                onClick={this.handleShowHiragana}
              >
                Hiragana
              </StyledButton>
              <StyledButton
                variant="contained"
                name="katakana"
                onClick={this.handleShowKatakana}
              >
                Katakana
              </StyledButton>
            </Div>
          </SectionGrid>
        </OuterGrid>
      </Zoom>
    );
  }
}

export default MyScores;
