import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { registerUser } from "../Redux/actions/auth";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "80%",
  marginTop: "8%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

class Registration extends Component {
  state = {
    email: "",
    password: "",
    repeatPassword: "",
    login: ""
  };

  handleChangeField = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitRegistration = e => {
    e.preventDefault();
    const { email, password, repeatPassword, login } = this.state;
    if (email.length !== 0 && password === repeatPassword && login.length > 2) {
      this.setState({
        email: "",
        password: "",
        repeatPassword: "",
        login: ""
      });

      this.props.register(email, password, login);
    }
  };
  render() {
    const { isAuthenticated } = this.props;
    const { login, email, password, repeatPassword } = this.state;
    if (isAuthenticated) {
      return <Redirect to="/home" />;
    } else {
      return (
        <OuterGrid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <section className="registration">
            <form
              className="registration-form"
              onSubmit={this.handleSubmitRegistration}
            >
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
                  name="login"
                  value={login}
                  onChange={this.handleChangeField}
                />
                <TextField
                  id="user-email-registration"
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChangeField}
                />
                <TextField
                  id="user-password-registration"
                  label="Hasło"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChangeField}
                />
                <TextField
                  id="user-password-repeat-registration"
                  label="Powtórz hasło"
                  variant="outlined"
                  type="password"
                  name="repeatPassword"
                  value={repeatPassword}
                  onChange={this.handleChangeField}
                />

                <div className="form-btns-container">
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Button variant="contained" type="submit">
                      Załóż konto
                    </Button>
                    lub
                    <Button variant="contained" component={Link} to="/">
                      Zaloguj się
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
}
const mapDispatchToProps = dispatch => {
  return {
    register: (email, password, login) => {
      dispatch(registerUser(email, password, login));
    }
  };
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.user !== null
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
