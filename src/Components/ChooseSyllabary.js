import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import UserNavBar from "./UserNavBar";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  marginTop: "15%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

const H2 = styled(Box)({
  fontSize: "2rem"
});

const StyledButton = styled(Button)({
  margin: "0 0.83rem 0.83rem 0.83rem",
  background: "#3f51b5"
});
const StyledLink = styled(Link)({
  color: "#fff",
  textDecoration: "none"
});
const InnerGrid = styled(Grid)({
  height: "100%"
});

class ChooseSyllabary extends Component {
  render() {
    return (
      <>
        <UserNavBar />
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
              {this.props.isUserHasWrongHiraganaAnswers ? (
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
              {this.props.isUserHasWrongKatakanaAnswers ? (
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
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserHasWrongHiraganaAnswers: state.auth.isUserHasWrongHiraganaAnswers,
    isUserHasWrongKatakanaAnswers: state.auth.isUserHasWrongKatakanaAnswers
  };
};

export default connect(mapStateToProps)(ChooseSyllabary);
