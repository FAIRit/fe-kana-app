import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

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
            <Link to="/home">
              <button className="form-login-btn">Zaloguj się</button>
            </Link>
            lub
            <Link to="/register">
              <button className="form-register-btn">Załóż konto</button>
            </Link>
          </div>
        </form>
      </section>
    );
  }
}

export default Login;
