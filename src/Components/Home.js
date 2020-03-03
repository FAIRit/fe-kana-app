import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeMenuPosition from "./HomeMenuPosition";
import UserNavBar from "./UserNavBar";
import ChooseSyllabary from "./ChooseSyllabary";

class Home extends Component {
  state = {
    isShown: false
  };

  //displaying choose syllabary component
  handleToggleClick = () => {
    this.setState({
      isShown: !this.state.isShown
    });
  };

  render() {
    const { isShown } = this.state;

    return (
      <section className="home">
        {isShown && <ChooseSyllabary />}
        <UserNavBar />
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
    );
  }
}

export default Home;
