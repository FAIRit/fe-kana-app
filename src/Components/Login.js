import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "80%",
  marginTop: "50px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

class Login extends Component {
  render() {
    return (
      <OuterGrid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <section className="login">
          <form className="login-form">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <h1 className="login-form-logo">Kana App</h1>
              <TextField
                id="user-name-login"
                label="Nazwa użytkownika"
                variant="outlined"
                type="text"
              />
              <TextField
                id="user-email-login"
                label="Email"
                variant="outlined"
                type="email"
              />
              <TextField
                id="user-password-login"
                label="Hasło"
                variant="outlined"
                type="password"
              />
              <div className="form-btns-container">
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <span className="form-forgot-password">
                    Zapomniałeś hasła?
                  </span>
                  <Button variant="contained" component={Link} to="/home">
                    Zaloguj się
                  </Button>
                  lub
                  <Button variant="contained" component={Link} to="/register">
                    Załóż konto
                  </Button>
                </Grid>
              </div>
            </Grid>
          </form>
        </section>
      </OuterGrid>
    );
  }
}

export default Login;
