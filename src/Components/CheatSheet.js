import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import UserNavBar from "./UserNavBar";
import SingleSign from "./SingleSign";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import KanaContext from "../contexts/KanaContext";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  marginTop: "55px",
  height: "80%",
  width: "100%",
  borderRadius: "35px",
  padding: "30px 30px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});
const FlexBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  fontSize: "1.9rem",
  margin: "0 auto",
  height: "87%"
});
const Div = styled(Box)({
  marginBottom: "0.83rem"
});

const MainBox = styled(Box)({
  height: "97%"
});
const StyledButton = styled(Button)({
  marginRight: "0.83rem",
  background: "#3f51b5",
  color: "#fff"
});

class CheatSheet extends Component {
  static contextType = KanaContext;

  state = {
    isHiraganaShown: false,
    isKatakanaShown: false,
    checked: true
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
    const { isHiraganaShown, isKatakanaShown, checked } = this.state;
    const { kanaTable } = this.context;

    return (
      <>
        <UserNavBar />
        <Zoom in={checked}>
          <OuterGrid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            component="section"
            onClick={this.handleFetchData}
            className="cheat-sheet"
          >
            <Div className="cheat-sheet-btns">
              <StyledButton
                variant="contained"
                onClick={this.handleGetHiragana}
              >
                Hiragana
              </StyledButton>
              <StyledButton
                variant="contained"
                onClick={this.handleGetKatakana}
              >
                Katakana
              </StyledButton>
            </Div>
            <MainBox component="main">
              <FlexBox>
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
              </FlexBox>

              <Button variant="contained" component={Link} to="/home">
                Powrót
              </Button>
            </MainBox>
          </OuterGrid>
        </Zoom>
      </>
    );
  }
}

const mapStatetoProps = state => {
  return {};
};

export default connect(mapStatetoProps)(CheatSheet);
