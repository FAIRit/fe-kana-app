import React, { Component } from "react";
import { Link } from "react-router-dom";

class BurgerMenu extends Component {
  render() {
    return (
      <nav className="burger-menu">
        <ul className="burger-menu__list">
          <li className="burger-menu__list-element">
            <Link to="/my-profile">Mój profil</Link>
          </li>
          <li className="burger-menu__list-element">
            <Link to="/my-score">Moje wyniki</Link>
          </li>
          <li className="burger-menu__list-element">
            <Link to="/settings">Ustawienia konta</Link>
          </li>
        </ul>
        <Link to="/">
          <button className="logout-btn">Wyloguj się</button>
        </Link>
      </nav>
    );
  }
}

export default BurgerMenu;
