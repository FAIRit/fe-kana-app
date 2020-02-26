import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import FormInput from "./FormInput";

class Registration extends Component {
  render() {
    return (
      <>
        <section className="registration">
          <form className="registration-form">
            <h1 className="registration-form-logo">Kana App</h1>
            <FormInput type="text" title="Nazwa użytkownika" />
            <FormInput type="email" title="Adres email" />
            <FormInput type="password" title="Hasło" />
            <FormInput type="password" title="Powtórz hasło" />
            <div className="form-btns-container">
              <Link to="/home">
                <button className="form-register-btn">Załóż konto</button>
              </Link>
              lub
              <Link to="/">
                <button className="form-login-btn">Zaloguj się</button>
              </Link>
            </div>
          </form>
        </section>
      </>
    );
  }
}

export default Registration;
