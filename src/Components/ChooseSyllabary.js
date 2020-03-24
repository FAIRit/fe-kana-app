import React, { Component } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import UserNavBar from "./UserNavBar";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  marginTop: "15%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

class ChooseSyllabary extends Component {
  render() {
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
                        to={
                          this.props.match.url + "/hiragana/choose-collection"
                        }
                      >
                        Hiragana
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={this.props.match.url + "/hiragana"}
                      >
                        Hiragana
                      </Button>
                    )}
                    {this.props.isUserHasWrongKatakanaAnswers ? (
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={
                          this.props.match.url + "/katakana/choose-collection"
                        }
                      >
                        Katakana
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={this.props.match.url + "/katakana"}
                      >
                        Katakana
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/home"
                    >
                      Powrót
                    </Button>
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
