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

    return (
      <DBox component="div" className="sign-box">
        <PBox component="p" className="sign-box__character">
          {kanaTable ? kanaTable : character}
        </PBox>
        {kanaMeaning && (
          <Box component="span" className="sign-box__meaning">
            {kanaMeaning}
          </Box>
        )}
        {percentage && (
          <>
            <Box
              component="span"
              className="sign-box__percentage"
              style={style}
            >
              {percentage + "%"}
            </Box>
          </>
        )}
      </DBox>
    );
  }
}

export default SingleSign;
