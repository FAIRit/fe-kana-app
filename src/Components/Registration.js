import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { registerUser } from "../Redux/actions/auth";

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
  justifyContent: "center",
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
});
const StyledButton = styled(Button)({
  marginTop: "0.83rem",
  background: "rgb(0, 43, 78)",
  color: "#fff",
});
class Registration extends Component {
  state = {
    email: "",
    password: "",
    repeatPassword: "",
    login: "",
    checked: true,
  };

  handleChangeInputField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitRegistration = (e) => {
    e.preventDefault();
    const { email, password, repeatPassword, login } = this.state;
    if (email.length !== 0 && password === repeatPassword && login.length > 2) {
      this.setState({
        email: "",
        password: "",
        repeatPassword: "",
        login: "",
      });

      this.props.register(email, password, login);
    }
  };
  render() {
    const { isAuthenticated } = this.props;
    const { login, email, password, repeatPassword, checked } = this.state;
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
            className="registration"
          >
            <Form
              component="form"
              className="registration-form"
              onSubmit={this.handleSubmitRegistration}
            >
              <H1 component="h1" className="registration-form-logo">
                Kana App
              </H1>
              <StyledTextField
                id="user-name-registration"
                label="Nazwa użytkownika"
                variant="outlined"
                type="text"
                name="login"
                value={login}
                onChange={this.handleChangeInputField}
              />
              <StyledTextField
                id="user-email-registration"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChangeInputField}
              />
              <StyledTextField
                id="user-password-registration"
                label="Hasło"
                variant="outlined"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChangeInputField}
              />
              <StyledTextField
                id="user-password-repeat-registration"
                label="Powtórz hasło"
                variant="outlined"
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                onChange={this.handleChangeInputField}
              />

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className="form-btns-container"
              >
                <StyledButton variant="contained" type="submit">
                  Załóż konto
                </StyledButton>
                <Span component="span">lub</Span>
                <Button variant="contained" component={Link} to="/">
                  Zaloguj się
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
    register: (email, password, login) => {
      dispatch(registerUser(email, password, login));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.user !== null,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
