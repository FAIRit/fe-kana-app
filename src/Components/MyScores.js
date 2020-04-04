import React, { Component } from "react";
import firebase from "firebase";
import KanaContext from "../contexts/KanaContext";
import Zoom from "@material-ui/core/Zoom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "80%",
  width: "100%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

class MyScores extends Component {
  static contextType = KanaContext;
  state = {
    checked: true,
    kanaTable: this.context.kanaTable
  };

  componentDidMount = () => {
    const handleGetData = user => {
      const { uid } = user;
      firebase
        .database()
        .ref("hiraganaIncorrectAnswers")
        .child(uid)
        .on("value", snapshot => {
          this.handleGetDataFromSnapshot(snapshot.val());
        });
    };
    firebase.auth().onAuthStateChanged(handleGetData);
  };

  handleGetDataFromSnapshot = data => {
    console.log(data);
    console.log(Object.keys(data));
    const arrayElements = Object.keys(data);
    arrayElements.forEach(element => {
      console.log(element);
      console.log(data[`${element}`].answers);
    });
  };

  render() {
    const { checked } = this.state;
    return (
      <Zoom in={checked}>
        <OuterGrid></OuterGrid>
      </Zoom>
    );
  }
}

export default MyScores;
