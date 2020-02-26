import React, { Component } from "react";
import HomeMenuPosition from "./HomeMenuPosition";
import UserNavBar from "./UserNavBar";

class Home extends Component {
  render() {
    return (
      <section className="home">
        <UserNavBar />
        <main className="home-container">
          <HomeMenuPosition title="Ściągawka" content="Tablica znaków" />
          <HomeMenuPosition
            title="Fiszki"
            content="Ucz sie we własnym tempie"
          />
          <HomeMenuPosition title="Quiz" content="Sprawdź się" />
        </main>
      </section>
    );
  }
}

export default Home;
