import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class Registration extends Component {
  render() {
    return (
      <section className="registration">
        <form className="registration-form">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <h1 className="registration-form-logo">Kana App</h1>
            <TextField
              id="user-name-registration"
              label="Nazwa użytkownika"
              variant="outlined"
              type="text"
            />
            <TextField
              id="user-email-registration"
              label="Email"
              variant="outlined"
              type="email"
            />
            <TextField
              id="user-password-registration"
              label="Hasło"
              variant="outlined"
              type="password"
            />
            <TextField
              id="user-password-repeat-registration"
              label="Powtórz hasło"
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
                <Link to="/home">
                  <button className="form-register-btn">Załóż konto</button>
                </Link>
                lub
                <Link to="/">
                  <button className="form-login-btn">Zaloguj się</button>
                </Link>
              </Grid>
            </div>
          </Grid>
        </form>
      </section>
    );
  }
}

export default Registration;
