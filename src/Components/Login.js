import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import Zoom from "@material-ui/core/Zoom";
import { loginUser } from "../Redux/actions/auth";
import { useState } from "react";

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

const Login = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
    setLogin("");
    setEmail("");
    setPassword("");
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  } else {
    return (
      <Zoom in={true}>
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
            onSubmit={handleSubmitLogin}
          >
            <H1 component="h1" className="login-form-logo">
              Kana App
            </H1>
            <StyledTextField
              id="user-name-login"
              label="Nazwa użytkownika"
              variant="outlined"
              type="text"
              onChange={(e) => setLogin(e.target.value)}
            />
            <StyledTextField
              id="user-email-login"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledTextField
              id="user-password-login"
              label="Hasło"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
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
};
export default Login;
