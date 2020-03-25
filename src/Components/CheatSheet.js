import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import UserNavBar from "./UserNavBar";
import SingleSign from "./SingleSign";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import KanaContext from "../contexts/KanaContext";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "80%",
  marginTop: "12%",
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

const MainBox = styled(Box)({
  height: "100%"
});

class CheatSheet extends Component {
  static contextType = KanaContext;

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
    const { isAuthenticated } = this.props;
    const { kanaTable } = this.context;

    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          <UserNavBar />
          <OuterGrid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            component="section"
            onClick={this.handleFetchData}
            className="cheat-sheet"
          >
            <div className="cheat-sheet-btns">
              <Button variant="contained" onClick={this.handleGetHiragana}>
                Hiragana
              </Button>
              <Button variant="contained" onClick={this.handleGetKatakana}>
                Katakana
              </Button>
            </div>
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
        </>
      );
    }
  }
}

const mapStatetoProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStatetoProps)(CheatSheet);
