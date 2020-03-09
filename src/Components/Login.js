import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component {
  render() {
    return (
      <section className="login">
        <form className="login-form">
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
            <span className="form-forgot-password">Zapomniałeś hasła?</span>
            <Button variant="contained" component={Link} to="/home">
              Zaloguj się
            </Button>
            lub
            <Button variant="contained" component={Link} to="/register">
              Załóż konto
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

export default Login;
