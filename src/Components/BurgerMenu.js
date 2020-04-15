import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { logoutUser } from "../Redux/actions/auth";
import { connect } from "react-redux";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";

const Nav = styled(Box)({
  width: "300px",
  padding: "15px 15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const StyledBox = styled(Box)({
  width: "100%",
  height: "260px",
  marginBottom: "30px",
});
const StyledList = styled(List)({
  width: "100%",
});

const StyledAvatar = styled(Avatar)({
  width: "100%",
  height: "100%",
});
const StyledListItem = styled(ListItem)({
  borderBottom: "0.8px solid rgba(0, 0, 0, 0.3)",
  padding: "15px 16px",
});
const StyledLink = styled(Box)({
  textDecoration: "none",
  fontSize: "1rem",
  color: "rgba(0, 0, 0, 0.87)",
});
const StyledButton = styled(Button)({
  marginTop: "1rem",
  background: "rgb(0, 43, 78)",
  color: "#fff",
});

class BurgerMenu extends Component {
  state = {
    user: this.props.user,
  };

  handleLogoutUser = (e) => {
    e.preventDefault();
    this.setState({
      user: "",
    });
    this.props.logout();
  };
  render() {
    const { user } = this.state;
    return (
      <Nav component="nav" className="burger-menu">
        <StyledBox className="avatar-container">
          <StyledAvatar src={user.avatarUrl} />
        </StyledBox>
        <StyledList className="burger-menu__list">
          <StyledListItem className="burger-menu__list-element">
            <StyledLink component={Link} to="/my-profile">
              Mój profil
            </StyledLink>
          </StyledListItem>
          <StyledListItem className="burger-menu__list-element">
            <StyledLink component={Link} to="/my-score">
              Moje wyniki
            </StyledLink>
          </StyledListItem>
          <StyledListItem className="burger-menu__list-element">
            <StyledLink component={Link} to="/about">
              O aplikacji
            </StyledLink>
          </StyledListItem>
        </StyledList>
        <StyledButton variant="contained" onClick={this.handleLogoutUser}>
          Wyloguj się
        </StyledButton>
      </Nav>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutUser());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
