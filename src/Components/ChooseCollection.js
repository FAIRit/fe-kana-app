import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { chooseWrongAnswers, getSyllabary } from "../Redux/actions/auth";
import KanaContext from "../contexts/KanaContext";
import UserNavBar from "./UserNavBar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { db } from "../Firebase/firebase";
import Zoom from "@material-ui/core/Zoom";

const OuterGrid = styled(Grid)({
  marginTop: "8vh",
  background: "rgb(255,255,255)",
  height: "70%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
});

const H2 = styled(Box)({
  fontSize: "2rem",
});
const InnerGrid = styled(Grid)({
  height: "100%",
});
const StyledButton = styled(Button)({
  margin: "0 0.83rem 0.83rem 0.83rem",
  color: "#fff",
  background: "rgb(0, 43, 78)",
});
const StyledLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
});
const Div = styled(Box)({
  textAlign: "center",
});

class ChooseCollection extends Component {
  static contextType = KanaContext;

  state = {
    url: "",
    checked: true,
    kanaTable: this.context.kanaTable,
  };

  componentDidMount = () => {
    this.handleGetUrlPath();
  };

  //preparing table with incorrect answers
  handleFetchAnswers = (data) => {
    const { kanaTable } = this.state;
    const incorrectAnswers = kanaTable.filter((element) => {
      return data[element.id] === true;
    });
    this.props.getSyllabaryFromDatabase(incorrectAnswers);
  };

  //getting proper url patch and data from database
  handleGetUrlPath = () => {
    const actualUrl = this.props.match.url;
    if (actualUrl.includes("quiz")) {
      this.setState({
        url: "/quiz/",
      });
    } else {
      this.setState({
        url: "/flash-cards/",
      });
    }

    //fetching proper answers
    const chosenSyllabary = this.props.match.params.syllabary;
    if (chosenSyllabary === "hiragana") {
      db.ref("users")
        .child(this.props.user)
        .child("quizes")
        .child("hiragana")
        .child("mistakes")
        .once("value", (snapshot) => {
          this.handleFetchAnswers(snapshot.val());
        });
    } else if (chosenSyllabary === "katakana") {
      db.ref("users")
        .child(this.props.user)
        .child("quizes")
        .child("katakana")
        .child("mistakes")
        .once("value", (snapshot) => {
          this.handleFetchAnswers(snapshot.val());
        });
    }
  };

  //check if user choose session with incorrect answers
  handleChooseCollection = (e) => {
    e.preventDefault();
    this.props.isUserChooseIncorrect(true);
  };

  componentWillUnmount = () => {
    this.props.getSyllabaryFromDatabase([]);
    this.props.isUserChooseIncorrect(false);
  };

  render() {
    const { url, checked } = this.state;
    return (
      <>
        <UserNavBar />
        <Zoom in={checked}>
          <OuterGrid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            className="choose-collection"
          >
            <InnerGrid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className="collection-container"
            >
              <H2 component="h2" className="collection-header">
                Wybierz kolekcję
              </H2>
              <Div className="collection-inputs-box">
                {this.props.isUserChooseIncorrectAnswers ? (
                  <StyledButton variant="contained">
                    <StyledLink
                      component={RouterLink}
                      to={url + this.props.match.params.syllabary}
                    >
                      Zaczynamy!
                    </StyledLink>
                  </StyledButton>
                ) : (
                  <>
                    <StyledButton
                      variant="contained"
                      onClick={this.handleChooseCollection}
                    >
                      Błędne opdowiedzi
                    </StyledButton>
                    <StyledButton variant="contained">
                      <StyledLink
                        component={RouterLink}
                        to={url + this.props.match.params.syllabary}
                      >
                        Nowa kolekcja
                      </StyledLink>
                    </StyledButton>
                  </>
                )}
              </Div>
              <Button
                variant="contained"
                className="back-btn"
                component={RouterLink}
                to="/home"
              >
                Powrót
              </Button>
            </InnerGrid>
          </OuterGrid>
        </Zoom>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.uid,
    isUserChooseIncorrectAnswers: state.auth.isUserChooseIncorrectAnswers,
    syllabaryFromDatabase: state.auth.syllabaryFromDatabase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isUserChooseIncorrect: (answer) => {
      dispatch(chooseWrongAnswers(answer));
    },
    getSyllabaryFromDatabase: (syllabary) => {
      dispatch(getSyllabary(syllabary));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCollection);
