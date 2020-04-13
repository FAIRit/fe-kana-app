import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import HomeMenuPosition from "./HomeMenuPosition";
import UserNavBar from "./UserNavBar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Zoom from "@material-ui/core/Zoom";
import Link from "@material-ui/core/Link";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
  padding: "30px 30px",
  color: "rgba(0, 0, 0, 0.87)",
});

const MuiLink = styled(Link)({
  textDecoration: "none",
  height: "28%",
});
const Section = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
});

class Home extends Component {
  state = {
    checked: true,
  };

  render() {
    return (
      <>
        <UserNavBar />
        <Zoom in={this.state.checked}>
          <OuterGrid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            className="home"
          >
            <Section className="home">
              <MuiLink component={RouterLink} to="/cheat-sheet">
                <HomeMenuPosition title="Ściągawka" content="Tablica znaków" />
              </MuiLink>
              <MuiLink component={RouterLink} to="/flash-cards">
                <HomeMenuPosition
                  title="Fiszki"
                  content="Ucz sie we własnym tempie"
                />
              </MuiLink>
              <MuiLink component={RouterLink} to="/quiz">
                <HomeMenuPosition title="Quiz" content="Sprawdź się" />
              </MuiLink>
            </Section>
          </OuterGrid>
        </Zoom>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Home);
