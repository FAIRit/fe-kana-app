import React, { Component } from "react";
import BurgerMenu from "./BurgerMenu";

class UserNavBar extends Component {
  state = {
    isMenuShown: false
  };

  handleShowMenu = () => {
    this.setState({
      isMenuShown: !this.state.isMenuShown
    });
  };
  render() {
    const { isMenuShown } = this.state;
    return (
      <header className="user-nav-bar">
        <div
          className="user-nav-bar__avatar"
          onClick={this.handleShowMenu}
        ></div>
        {isMenuShown && <BurgerMenu />}
        <span className="user-nav-bar__user-name">Witaj Angelika!</span>
      </header>
    );
  }
}

export default UserNavBar;
