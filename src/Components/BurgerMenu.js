import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { logoutUser } from "../Redux/actions/auth";
import { connect } from "react-redux";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";

const Nav = styled(Box)({
  width: "250px",
  padding: "15px 15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

const StyledList = styled(List)({
  width: "100%"
});

const StyledAvatar = styled(Avatar)({
  width: "100%",
  height: "100%",
  marginBottom: "30px"
});

class BurgerMenu extends Component {
  state = {
    user: this.props.user
  };

  handleLogoutUser = e => {
    e.preventDefault();
    this.setState({
      user: ""
    });
    this.props.logout();
  };
  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <Nav component="nav" className="burger-menu">
          <StyledAvatar />
          <StyledList className="burger-menu__list">
            <ListItem className="burger-menu__list-element">
              <Link to="/my-profile">Mój profil</Link>
            </ListItem>
            <ListItem className="burger-menu__list-element">
              <Link to="/my-score">Moje wyniki</Link>
            </ListItem>
            <ListItem className="burger-menu__list-element">
              <Link to="/settings">Ustawienia konta</Link>
            </ListItem>
          </StyledList>
          <Button variant="contained" onClick={this.handleLogoutUser}>
            Wyloguj się
          </Button>
        </Nav>
      );
    }
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
