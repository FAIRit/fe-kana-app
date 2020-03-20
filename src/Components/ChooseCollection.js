import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { chooseWrongAnswers, getSyllabary } from "../Redux/actions/auth";
import UserNavBar from "./UserNavBar";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { db } from "../Firebase/firebase";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  marginTop: "15%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});
class ChooseCollection extends Component {
  state = {
    url: ""
  };

  //fetching data from database
  handleFetchAnswers = data => {
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
        .on("value", snapshot => {
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
        .on("value", snapshot => {
          this.props.getSyllabaryFromDatabase(snapshot.val());
        });
    }
  };

  //getting proper url patch and data key
  handleGetUrlPath = () => {
    const actualUrl = this.props.match.url;
    if (actualUrl.includes("quiz")) {
      this.setState({
        url: "/quiz/"
      });
    } else {
      this.setState({
        url: "/flash-cards/"
      });
    }
    const chosenSyllabary = this.props.match.params.syllabary;
    if (chosenSyllabary === "hiragana") {
      db.ref("hiraganaIncorrectAnswers/" + this.props.user)
        .orderByKey()
        .limitToLast(1)
        .once("child_added")
        .then(snapshot => {
          console.log(snapshot);
          this.handleFetchAnswers(snapshot);
        });
    } else if (chosenSyllabary === "katakana") {
      db.ref("katakanaIncorrectAnswers/" + this.props.user)
        .limitToLast(1)
        .once("child_added")
        .then(snapshot => {
          console.log(snapshot);
          this.handleFetchAnswers(snapshot);
        });
    }
  };

  //check if user choose answers from database
  handleChooseCollection = e => {
    e.preventDefault();
    this.props.isUserChooseIncorrect();
  };

  componentDidMount = () => {
    this.handleGetUrlPath();
  };

  render() {
    const { url } = this.state;
    return (
      <>
        <UserNavBar />
        <OuterGrid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <section className="syllabary">
            <div className="syllabary-container">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <h2 className="syllabary-header">Wybierz kolekcję</h2>
                <div className="syllabary-inputs-box">
                  {this.props.isUserChooseIncorrectAnswers ? (
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to={url + this.props.match.params.syllabary}
                    >
                      Zaczynamy!
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        onClick={this.handleChooseCollection}
                      >
                        Pobierz niepoprawne odpowiedzi z ostatniej sesji
                      </Button>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={url + this.props.match.params.syllabary}
                      >
                        Nowa sesja
                      </Button>
                    </>
                  )}
                  <Link component={RouterLink} to="/home">
                    Powrót
                  </Link>
                </div>
              </Grid>
            </div>
          </section>
        </OuterGrid>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isUserChooseIncorrectAnswers: state.auth.isUserChooseIncorrectAnswers,
    syllabaryFromDatabase: state.auth.syllabaryFromDatabase
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isUserChooseIncorrect: () => {
      dispatch(chooseWrongAnswers());
    },
    getSyllabaryFromDatabase: syllabary => {
      dispatch(getSyllabary(syllabary));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCollection);
