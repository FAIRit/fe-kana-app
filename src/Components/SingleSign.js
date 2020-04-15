import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";

const PBox = styled(Box)({
  margin: "0 auto",
});
const DBox = styled(Box)({
  textAlign: "center",
});

class SingleSign extends Component {
  render() {
    const { kanaTable, kanaMeaning, percentage, character, style } = this.props;
    if (kanaTable) {
      return (
        <DBox component="div" className="sign-box">
          <PBox component="p" className="sign-box-character">
            {kanaTable}
          </PBox>

          <Box component="span" className="sign-box-meaning">
            {kanaMeaning}
          </Box>
        </DBox>
      );
    } else {
      return (
        <DBox component="div" className="sign-box">
          <PBox component="p" className="sign-box-character">
            {character}
          </PBox>

          <Box component="span" className="sign-box-percentage" style={style}>
            {percentage + "%"}
          </Box>
        </DBox>
      );
    }
  }
}

export default SingleSign;
