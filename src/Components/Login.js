import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";

class Login extends Component {
  render() {
    const OuterGrid = styled(Grid)({
      background: "rgb(255,255,255)",
      height: "80%",
      marginTop: "50px",
      borderRadius: "35px",
      boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
    });
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
                  <Link to="/home">
                    <button className="form-login-btn">Zaloguj się</button>
                  </Link>
                  lub
                  <Link to="/register">
                    <button className="form-register-btn">Załóż konto</button>
                  </Link>
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
