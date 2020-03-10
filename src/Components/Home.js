import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeMenuPosition from "./HomeMenuPosition";
import UserNavBar from "./UserNavBar";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "70%",
  marginTop: "90px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
  padding: "30px 30px"
});

class Home extends Component {
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
          <section className="home">
            <main className="home-container">
              <Link to="/cheat-sheet">
                <HomeMenuPosition title="Ściągawka" content="Tablica znaków" />
              </Link>
              <Link to="/flash-cards">
                <HomeMenuPosition
                  title="Fiszki"
                  content="Ucz sie we własnym tempie"
                />
              </Link>
              <Link to="/quiz">
                <HomeMenuPosition title="Quiz" content="Sprawdź się" />
              </Link>
            </main>
          </section>
        </OuterGrid>
      </>
    );
  }
}

export default Home;
