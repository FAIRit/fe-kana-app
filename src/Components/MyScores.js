import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import KanaContext from "../contexts/KanaContext";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import SingleSign from "./SingleSign";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "90%",
  width: "100%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
});
const SectionGrid = styled(Grid)({
  height: "100%",
  width: "100%",
});
const Div = styled(Box)({});

const StyledButton = styled(Button)({
  margin: "0 0.83rem 0.83rem 0",
  background: "rgb(0, 43, 78)",
  color: "#fff",
});
const CharContainer = styled(Grid)({
  height: "60%",
  width: "100%",
  fontSize: "1.4rem",
  margin: "0 auto",
});
const H2 = styled(Box)({
  fontSize: "1.5rem",
  margin: "0.83rem auto",
});
const BackButton = styled(Button)({
  marginTop: "auto",
});
const StyledLink = styled(Link)({
  color: "#000",
  textDecoration: "none",
});

class MyScores extends Component {
  static contextType = KanaContext;
  state = {
    checked: true,
    kanaTable: this.context.kanaTable,
    chosenSyllabary: "",
    stats: [],
    dataExists: true,
    totalQuizTime: "",
  };

  handleDisplayQuizTime = (data) => {
    if (data.exists()) {
      const time = data
        .child(this.state.chosenSyllabary)
        .child("totalTime")
        .val();
      this.setState({
        totalQuizTime: time,
      });
    } else {
      this.setState({
        totalQuizTime: "0",
      });
    }
  };

  handleShowHiragana = () => {
    this.setState({
      chosenSyllabary: "hiragana",
    });
    this.handleShowData();
  };

  handleShowKatakana = () => {
    this.setState({
      chosenSyllabary: "katakana",
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
        .child(this.state.chosenSyllabary)
        .once("value", (snapshot) => {
          this.handleGetDataFromSnapshot(snapshot);
        });

      const timeRef = firebase
        .database()
        .ref("users")
        .child(user.uid)
        .child("quizes");
      timeRef.once("value", (snapshot) => {
        this.handleDisplayQuizTime(snapshot);
      });
    };
    firebase.auth().onAuthStateChanged(handleGetData);
  };

  handleGetDataFromSnapshot = (data) => {
    const quizes = data.val();
    if (quizes === null) {
      this.setState({
        dataExists: false,
      });
    } else {
      this.setState({
        dataExists: true,
      });

      //number of finished quizes per syllabary
      const charmaps = Object.values(quizes);

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
      this.state.kanaTable.forEach((element) => {
        const idElement = distribution[element.id];
        const totalQuizes = idElement
          ? idElement.correct + idElement.incorrect
          : 0;
        const data = {
          id: element.id,
          [this.state.chosenSyllabary]: element[this.state.chosenSyllabary],
          answersPercentage: idElement
            ? ((idElement.correct / totalQuizes) * 100).toFixed(0)
            : null,
        };
        characters.push(data);
      });
      this.setState({
        stats: characters,
      });
    }
  };

  render() {
    const {
      checked,
      chosenSyllabary,
      stats,
      dataExists,
      totalQuizTime,
    } = this.state;
    return (
      <Zoom in={checked}>
        <OuterGrid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          className="my-scores"
        >
          <SectionGrid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className="my-scores-section"
          >
            <Div className="my-scores-btns-box">
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
            <H2 component="h2" className="my-scores-title">
              Poświęcony czas: {totalQuizTime + "s"}
            </H2>
            <H2 component="h2" className="my-scores-title">
              Celność odpowiedzi
            </H2>
            <CharContainer
              container
              direction="column"
              wrap="wrap"
              justify="center"
              alignItems="center"
              className="my-scores-container"
            >
              {dataExists &&
                stats.map((statElement) => (
                  <SingleSign
                    percentage={statElement.answersPercentage}
                    character={statElement[chosenSyllabary]}
                    key={statElement.id}
                    style={{ fontSize: "1rem" }}
                  />
                ))}
              {!dataExists && (
                <p>Jeszcze nie posiadasz ukończonych quizów :(</p>
              )}
            </CharContainer>
            <BackButton variant="contained">
              <StyledLink to="/home" component={Link}>
                Powrót
              </StyledLink>
            </BackButton>
          </SectionGrid>
        </OuterGrid>
      </Zoom>
    );
  }
}

export default MyScores;
