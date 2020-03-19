import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  marginTop: "15%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});
class ChooseCollection extends Component {
  render() {
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
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={"/quiz/" + this.props.match.params.syllabary}
                  >
                    Pobierz niepoprawne odpowiedzi z ostatniej sesji
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={"/quiz/" + this.props.match.params.syllabary}
                  >
                    Nowy quiz
                  </Button>
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

export default ChooseCollection;
