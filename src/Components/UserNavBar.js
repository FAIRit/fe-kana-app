import React, { Component } from "react";
import BurgerMenu from "./BurgerMenu";
import Avatar from "@material-ui/core/Avatar";

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
        <Avatar onClick={this.handleShowMenu}></Avatar>
        {isMenuShown && <BurgerMenu />}
        <span className="user-nav-bar__user-name">Witaj Angelika!</span>
      </header>
    );
  }
}

export default UserNavBar;
