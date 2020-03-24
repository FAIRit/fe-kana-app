import React, { Component } from "react";
import BurgerMenu from "./BurgerMenu";
import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { styled } from "@material-ui/core/styles";

const StyledAvatar = styled(Avatar)({
  width: "60px",
  height: "60px",
  cursor: "pointer"
});

const StyledAppBar = styled(AppBar)({
  padding: "10px 10px",
  flexDirection: "row",
  alignItems: "center"
});

const StyledSpan = styled(Box)({
  fontSize: "1.575rem",
  marginLeft: "20px"
});

class UserNavBar extends Component {
  state = {
    left: false,
    side: "left"
  };

  handleToggleDrawer = left => event => {
    this.setState({
      left: left
    });
  };

  render() {
    const { left } = this.state;
    const { user, image } = this.props;
    return (
      <StyledAppBar className="user-nav-bar">
        <StyledAvatar onClick={this.handleToggleDrawer(true)} src={image} />
        <StyledSpan component="span" className="user-name">
          Witaj {user} !
        </StyledSpan>
        <Drawer open={left} onClose={this.handleToggleDrawer(false)}>
          <div role="presentation" onClick={this.handleToggleDrawer(false)}>
            <BurgerMenu />
          </div>
        </Drawer>
      </StyledAppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    image: state.auth.image
  };
};

export default connect(mapStateToProps)(UserNavBar);
