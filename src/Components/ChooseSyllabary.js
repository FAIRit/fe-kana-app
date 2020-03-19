import React, { Component } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import UserNavBar from "./UserNavBar";
// import ChooseCollection from "./ChooseCollection";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  marginTop: "15%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

class ChooseSyllabary extends Component {
  state = {
    url: this.props.match.url
  };
  render() {
    const { url } = this.state;
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
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
                  <h2 className="syllabary-header">Wybierz sylabariusz</h2>
                  <div className="syllabary-inputs-box">
                    {this.props.isUserHasWrongHiraganaAnswers ? (
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={url + "/hiragana/choose-collection"}
                        urlpath={url}
                      >
                        Hiragana
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={url + "/hiragana"}
                      >
                        Hiragana
                      </Button>
                    )}
                    {this.props.isUserHasWrongKatakanaAnswers ? (
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={url + "/katakana/choose-collection"}
                        urlpath={url}
                      >
                        Katakana
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={url + "/katakana"}
                      >
                        Katakana
                      </Button>
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
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isUserHasWrongHiraganaAnswers: state.auth.isUserHasWrongHiraganaAnswers,
    isUserHasWrongKatakanaAnswers: state.auth.isUserHasWrongKatakanaAnswers
  };
};

export default connect(mapStateToProps)(ChooseSyllabary);
