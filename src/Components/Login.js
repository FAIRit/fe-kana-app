import React, { Component } from "react";
import { Link } from "react-router-dom";
// import FormInput from "./FormInput";
import TextField from "@material-ui/core/TextField";

class Login extends Component {
  render() {
    return (
      <section className="login">
        <form className="login-form">
          <h1 className="login-form-logo">Kana App</h1>
          {/* <FormInput type="text" title="Nazwa użytkownika" /> */}
          <TextField
            id="user-name"
            label="Nazwa użytkownika"
            variant="outlined"
          />
          <TextField id="user-email" label="Email" variant="outlined" />
          <TextField id="user-password" label="Hasło" variant="outlined" />
          {/* <FormInput type="email" title="Adres email" /> */}
          {/* <FormInput type="password" title="Hasło" /> */}
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
