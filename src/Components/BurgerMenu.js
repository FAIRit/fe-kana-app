import React, { Component } from "react";
import { Link } from "react-router-dom";
import "firebase/firestore";
import Button from "@material-ui/core/Button";
import { logoutUser } from "../Redux/actions/auth";
import { connect } from "react-redux";

class BurgerMenu extends Component {
  state = {
    user: this.props.user
  };

  handleLogoutUser = e => {
    e.preventDefault();
    this.setState(
      {
        user: ""
      },
      () => {
        this.props.logout();
      }
    );
  };
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
        <Button
          variant="contained"
          component={Link}
          to="/"
          onClick={this.handleLogoutUser}
        >
          Wyloguj się
        </Button>
      </nav>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutUser());
    }
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
