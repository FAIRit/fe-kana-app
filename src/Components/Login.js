import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import "firebase/firestore";
import { connect } from "react-redux";
import Zoom from "@material-ui/core/Zoom";
import { loginUser } from "../Redux/actions/auth";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "80%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
});

const Form = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});
const H1 = styled(Box)({
  marginTop: "0px",
  fontSize: "2.5rem",
  alignContent: "flex-start",
});
const StyledTextField = styled(TextField)({
  marginBottom: "0.3rem",
});

const Span = styled(Box)({
  fontSize: "0.93rem",
  padding: "0.83rem",
  textDecoration: "none",
  color: "#000",
});
const StyledButton = styled(Button)({
  background: "rgb(0, 43, 78)",
  color: "#fff",
});

class Login extends Component {
  state = {
    login: "",
    email: "",
    password: "",
    checked: true,
  };
  handleChangeField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitLogin = (e) => {
    e.preventDefault();
    const { email, password, login } = this.state;
    this.setState({
      login: "",
      email: "",
      password: "",
    });
    this.props.login(email, password, login);
  };

  render() {
    const { isAuthenticated } = this.props;
    const { email, password, login, checked } = this.state;
    if (isAuthenticated) {
      return <Redirect to="/home" />;
    } else {
      return (
        <Zoom in={checked}>
          <OuterGrid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className="login"
          >
            <Form
              component="form"
              className="login-form"
              onSubmit={this.handleSubmitLogin}
            >
              <H1 component="h1" className="login-form-logo">
                Kana App
              </H1>
              <StyledTextField
                id="user-name-login"
                label="Nazwa użytkownika"
                variant="outlined"
                type="text"
                name="login"
                value={login}
                onChange={this.handleChangeField}
              />
              <StyledTextField
                id="user-email-login"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChangeField}
              />
              <StyledTextField
                id="user-password-login"
                label="Hasło"
                variant="outlined"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChangeField}
              />

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className="form-btns-container"
              >
                <Span
                  component={Link}
                  to="/change-password"
                  className="form-forgot-password"
                >
                  Zapomniałeś hasła?
                </Span>
                <StyledButton variant="contained" type="submit">
                  Zaloguj się
                </StyledButton>
                <Span component="span">lub</Span>
                <Button variant="contained" component={Link} to="/register">
                  Załóż konto
                </Button>
              </Grid>
            </Form>
          </OuterGrid>
        </Zoom>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password, login) => {
      dispatch(loginUser(email, password, login));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
