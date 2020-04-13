import React, { Component } from "react";
import { connect } from "react-redux";
import UserNavBar from "./UserNavBar";
import BtnsBox from "./BtnsBox";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import KanaContext from "../contexts/KanaContext";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
});
const Section = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
const InnerGrid = styled(Grid)({
  width: "100%",
  height: "100%",
});
const Span = styled(Box)({
  fontSize: "2rem",
});
const P = styled(Box)({
  fontSize: "10rem",
  margin: "auto 0",
});

class FlashCards extends Component {
  static contextType = KanaContext;

  state = {
    kanaTable: [],
    kanaCounter: 0,
    isMeaningShown: false,
    checked: true,
  };

  // showing characte's meaning
  handleShowMeaning = () => {
    this.setState({
      isMeaningShown: !this.state.isMeaningShown,
    });
  };

  // moving to next flash card
  handleShowNextCharacter = () => {
    if (this.state.kanaCounter !== this.state.kanaTable.length - 1) {
      this.setState({
        kanaCounter: this.state.kanaCounter + 1,
        isMeaningShown: false,
      });
    }
  };

  // moving to previous flash card
  handleShowPrevCharacter = () => {
    if (this.state.kanaCounter !== 0) {
      this.setState({
        kanaCounter: this.state.kanaCounter - 1,
        isMeaningShown: false,
      });
    }
  };

  componentDidMount = () => {
    if (this.props.isUserChooseIncorrectAnswers) {
      this.setState({
        kanaTable: this.props.syllabaryFromDatabase,
      });
    } else {
      this.setState({
        kanaTable: this.context.kanaTable.slice().sort(() => {
          return 0.5 - Math.random();
        }),
      });
    }
  };

  render() {
    const { kanaCounter, isMeaningShown, kanaTable, checked } = this.state;

    return (
      <>
        <UserNavBar />
        <Zoom in={checked}>
          <OuterGrid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className="flash-cards"
          >
            <Section component="section">
              <InnerGrid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                className="flash-cards-container"
                onClick={this.handleShowMeaning}
              >
                <Span component="span" className="flash-cards-id">
                  {kanaCounter + 1}
                </Span>
                {!isMeaningShown ? (
                  <P component="p" className="flash-cards-character">
                    {kanaTable[kanaCounter] &&
                      kanaTable[kanaCounter][this.props.match.params.syllabary]}
                  </P>
                ) : (
                  <P component="p" className="flash-cards-meaning">
                    {kanaTable[kanaCounter] && kanaTable[kanaCounter].meaning}
                  </P>
                )}
              </InnerGrid>
              <BtnsBox
                onPrev={this.handleShowPrevCharacter}
                onNext={this.handleShowNextCharacter}
                componentToUse="flashCards"
              />
            </Section>
          </OuterGrid>
        </Zoom>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUserChooseIncorrectAnswers: state.auth.isUserChooseIncorrectAnswers,
    syllabaryFromDatabase: state.auth.syllabaryFromDatabase,
  };
};

export default connect(mapStateToProps)(FlashCards);
