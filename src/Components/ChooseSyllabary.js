import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { fire } from "../Firebase/firebase";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Zoom from "@material-ui/core/Zoom";
import UserNavBar from "./UserNavBar";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
});

const H2 = styled(Box)({
  fontSize: "2rem",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  margin: "0 0.83rem 0.83rem 0.83rem",
  background: "#3f51b5",
});
const StyledLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
});
const InnerGrid = styled(Grid)({
  height: "100%",
});

class ChooseSyllabary extends Component {
  state = {
    checked: true,
    isUserHasHiragana: false,
    isUserHasKatakana: false,
  };

  componentDidMount = () => {
    fire.auth().onAuthStateChanged((user) => {
      //hiragana
      {
        const handleHiragana = (snapshot) => {
          const answers = snapshot.exists();
          this.setState({
            isUserHasHiragana: answers,
          });
        };
        const hiraganaRef = fire
          .database()
          .ref("users")
          .child(user.uid)
          .child("quizes")
          .child("hiragana")
          .child("mistakes");
        hiraganaRef.once("value", handleHiragana);
      }

      // katakana
      {
        const handleKatakana = (snapshot) => {
          const answers = snapshot.exists();
          this.setState({
            isUserHasKatakana: answers,
          });
        };

        const katakanaRef = fire
          .database()
          .ref("users")
          .child(user.uid)
          .child("quizes")
          .child("katakana")
          .child("mistakes");

        katakanaRef.once("value", handleKatakana);
      }
    });
  };

  render() {
    return (
      <>
        <UserNavBar />
        <Zoom in={this.state.checked}>
          <OuterGrid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
            <InnerGrid
              container
              direction="column"
              alignItems="center"
              justify="center"
              className="syllabary-container"
            >
              <H2 component="h2" className="syllabary-header">
                Wybierz sylabariusz
              </H2>
              <div className="syllabary-inputs-box">
                {this.state.isUserHasHiragana ? (
                  <StyledButton variant="contained">
                    <StyledLink
                      component={RouterLink}
                      to={this.props.match.url + "/hiragana/choose-collection"}
                    >
                      Hiragana
                    </StyledLink>
                  </StyledButton>
                ) : (
                  <StyledButton variant="contained">
                    <StyledLink
                      component={RouterLink}
                      to={this.props.match.url + "/hiragana"}
                    >
                      Hiragana
                    </StyledLink>
                  </StyledButton>
                )}
                {this.state.isUserHasKatakana ? (
                  <StyledButton variant="contained">
                    <StyledLink
                      component={RouterLink}
                      to={this.props.match.url + "/katakana/choose-collection"}
                    >
                      Katakana
                    </StyledLink>
                  </StyledButton>
                ) : (
                  <StyledButton variant="contained">
                    <StyledLink
                      component={RouterLink}
                      to={this.props.match.url + "/katakana"}
                    >
                      Katakana
                    </StyledLink>
                  </StyledButton>
                )}
              </div>
              <Button variant="contained" component={RouterLink} to="/home">
                Powrót
              </Button>
            </InnerGrid>
          </OuterGrid>
        </Zoom>
      </>
    );
  }
}

export default ChooseSyllabary;
