import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import BtnsBox from "./BtnsBox";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  marginTop: "15%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

class FlashCards extends Component {
  state = {
    kanaTable: this.props.kanaTable.sort(() => {
      return 0.5 - Math.random();
    }),
    kanaCounter: 0,
    isMeaningShown: false
  };

  // showing characte's meaning
  handleShowMeaning = () => {
    this.setState({
      isMeaningShown: !this.state.isMeaningShown
    });
  };

  // moving to next flash card
  handleShowNextCharacter = () => {
    if (this.state.kanaCounter !== this.state.kanaTable.length - 1) {
      this.setState({
        kanaCounter: this.state.kanaCounter + 1
      });
    }
  };

  // moving to previous flash card
  handleShowPrevCharacter = () => {
    if (this.state.kanaCounter !== 0) {
      this.setState({
        kanaCounter: this.state.kanaCounter - 1
      });
    }
  };

  render() {
    const { kanaCounter, isMeaningShown, kanaTable } = this.state;
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
            alignItems="center"
          >
            <section className="flash-cards">
              <div
                className="flash-cards-container"
                onClick={this.handleShowMeaning}
              >
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <span className="flash-cards-id">{kanaCounter + 1}</span>
                  {!isMeaningShown ? (
                    <p className="flash-cards-character">
                      {kanaTable[kanaCounter] &&
                        kanaTable[kanaCounter][
                          this.props.match.params.syllabary
                        ]}
                    </p>
                  ) : (
                    <p className="flash-cards-meaning">
                      {kanaTable[kanaCounter] && kanaTable[kanaCounter].meaning}
                    </p>
                  )}
                </Grid>
              </div>
              <BtnsBox
                onPrev={this.handleShowPrevCharacter}
                onNext={this.handleShowNextCharacter}
              />
            </section>
          </OuterGrid>
        </>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(FlashCards);
