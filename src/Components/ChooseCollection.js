import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { chooseWrongAnswers, getSyllabary } from "../Redux/actions/auth";
import UserNavBar from "./UserNavBar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { db } from "../Firebase/firebase";
import Zoom from "@material-ui/core/Zoom";

const OuterGrid = styled(Grid)({
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
  background: "#3f51b5",
});
const StyledLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
});
const Div = styled(Box)({
  textAlign: "center",
});

class ChooseCollection extends Component {
  state = {
    url: "",
    checked: true,
  };

  //fetching data from database
  handleFetchAnswers = (data) => {
    if (this.props.match.params.syllabary === "hiragana") {
      db.ref(
        "hiraganaIncorrectAnswers/" +
          this.props.user +
          "/" +
          data.key +
          "/answers"
      )
        .orderByValue()
        .limitToLast(46)
        .on("value", (snapshot) => {
          this.props.getSyllabaryFromDatabase(snapshot.val());
        });
    } else {
      db.ref(
        "katakanaIncorrectAnswers/" +
          this.props.user +
          "/" +
          data.key +
          "/answers"
      )
        .orderByValue()
        .limitToLast(46)
        .on("value", (snapshot) => {
          this.props.getSyllabaryFromDatabase(snapshot.val());
        });
    }
  };

  //getting proper url patch and data key
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
    const chosenSyllabary = this.props.match.params.syllabary;
    if (chosenSyllabary === "hiragana") {
      db.ref("hiraganaIncorrectAnswers/" + this.props.user)
        .orderByKey()
        .limitToLast(1)
        .once("child_added")
        .then((snapshot) => {
          console.log(snapshot);
          this.handleFetchAnswers(snapshot);
        });
    } else if (chosenSyllabary === "katakana") {
      db.ref("katakanaIncorrectAnswers/" + this.props.user)
        .limitToLast(1)
        .once("child_added")
        .then((snapshot) => {
          this.handleFetchAnswers(snapshot);
        });
    }
  };

  //check if user choose answers from database
  handleChooseCollection = (e) => {
    e.preventDefault();
    this.props.isUserChooseIncorrect();
  };

  componentDidMount = () => {
    this.handleGetUrlPath();
    this.setState({
      checked: true,
    });
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.uid,
    isUserChooseIncorrectAnswers: state.auth.isUserChooseIncorrectAnswers,
    syllabaryFromDatabase: state.auth.syllabaryFromDatabase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isUserChooseIncorrect: () => {
      dispatch(chooseWrongAnswers());
    },
    getSyllabaryFromDatabase: (syllabary) => {
      dispatch(getSyllabary(syllabary));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCollection);
