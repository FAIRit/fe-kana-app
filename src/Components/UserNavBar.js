import React, { Component } from "react";
import BurgerMenu from "./BurgerMenu";

class UserNavBar extends Component {
  render() {
    return (
      <>
        <header className="user-nav-bar">
          <div className="user-nav-bar__avatar"></div>
          <BurgerMenu />
          <span className="user-nav-bar__user-name">Witaj Angelika!</span>
        </header>
      </>
    );
  }
}

export default UserNavBar;
