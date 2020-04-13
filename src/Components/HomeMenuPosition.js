import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/styles";
import picture1 from "../assets/295076-japan/png/japanese.png";
import picture2 from "../assets/295076-japan/png/hat.png";
import picture3 from "../assets/295076-japan/png/ninja.png";

const H2 = styled(Box)({
  fontSize: "2rem",
  marginBottom: "0.5rem",
});
const Img = styled(Box)({ height: "100%", marginRight: "1.8rem" });
const Div = styled(Grid)({
  height: "100%",
  width: "100%",

  color: "rgba(0,0,0,0.87)",
});
const P = styled(Box)({
  marginTop: "0.5rem",
  overflow: "wrap",
  fontSize: "1.087rem",
  fontStyle: "italic",
});
const DivBox = styled(Box)({
  width: "50%",
});

class HomeMenuPosition extends Component {
  render() {
    let picture;
    if (this.props.title === "Ściągawka") {
      picture = picture1;
    } else if (this.props.title === "Fiszki") {
      picture = picture2;
    } else {
      picture = picture3;
    }
    return (
      <Div
        container
        direction="row"
        alignItems="center"
        className="menu-position-container"
      >
        <Img component="img" src={picture} alt="decoration_picture" />
        <DivBox className="menu-position-box">
          <H2 className="menu-position-title" component="h2">
            {this.props.title}
          </H2>
          <P component="p" className="menu-position-content">
            {this.props.content}
          </P>
        </DivBox>
      </Div>
    );
  }
}

export default HomeMenuPosition;
