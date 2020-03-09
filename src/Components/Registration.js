import React, { Component } from "react";
import { Link } from "react-router-dom";
// import FormInput from "./FormInput";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Registration extends Component {
  render() {
    return (
      <section className="registration">
        <form className="registration-form">
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
          {/* <FormInput type="text" title="Nazwa użytkownika" /> */}
          {/* <FormInput type="email" title="Adres email" /> */}
          {/* <FormInput type="password" title="Hasło" /> */}
          {/* <FormInput type="password" title="Powtórz hasło" /> */}
          <div className="form-btns-container">
            {/* <Link to="/home">
              <button className="form-register-btn">Załóż konto</button>
            </Link> */}
            <Button variant="contained" component={Link} to="/home">
              {" "}
              Załóż konto
            </Button>
            lub
            {/* <Link to="/">
              <button className="form-login-btn">Zaloguj się</button>
            </Link> */}
            <Button variant="contained" component={Link} to="/">
              Zaloguj się
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

export default Registration;
