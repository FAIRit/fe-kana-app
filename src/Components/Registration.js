import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class Registration extends Component {
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
                  <Button variant="contained" component={Link} to="/home">
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

export default Registration;
