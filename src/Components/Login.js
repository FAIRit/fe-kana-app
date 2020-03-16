import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import "firebase/firestore";
import { connect } from "react-redux";
import { loginUser } from "../Redux/actions/auth";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "80%",
  marginTop: "8%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)"
});

class Login extends Component {
  state = {
    login: "",
    email: "",
    password: ""
  };
  handleChangeField = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitLogin = e => {
    e.preventDefault();
    const { email, password, login } = this.state;
    this.setState({
      login: "",
      email: "",
      password: ""
    });
    this.props.login(email, password, login);
  };

  render() {
    const { isAuthenticated } = this.props;
    const { email, password, login } = this.state;
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
          <section className="login">
            <form className="login-form" onSubmit={this.handleSubmitLogin}>
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
                  name="login"
                  value={login}
                  onChange={this.handleChangeField}
                />
                <TextField
                  id="user-email-login"
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChangeField}
                />
                <TextField
                  id="user-password-login"
                  label="Hasło"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChangeField}
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
                    <Button variant="contained" type="submit">
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
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password, login) => {
      dispatch(loginUser(email, password, login));
    }
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
