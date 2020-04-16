import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { styled } from "@material-ui/core/styles";
import firebase from "firebase";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "80%",
  padding: "30px 30px",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
});

const Form = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
const StyledTextField = styled(TextField)({
  margin: "0.83rem 0",
});
const StyledButton = styled(Button)({
  margin: "1.63rem 0",
  background: "rgb(0, 43, 78)",
  color: "#fff",
});
const H2 = styled(Box)({
  textAlign: "center",
});
const P = styled(Box)({
  margin: "0",
  position: "absolute",
  bottom: "-10px",
  left: "0",
});
const InputBox = styled(Box)({
  position: "relative",
});
const StyledLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
});

class ChangePassword extends Component {
  state = {
    checked: true,
    email: "",
    isFormSend: false,
    validateMessage: "",
  };

  handleChangeInputField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //sending change password email
  handleSetUsersPassword = (e) => {
    e.preventDefault();
    const auth = firebase.auth();
    const emailAddress = this.state.email;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        this.setState({
          isFormSend: true,
          validateMessage: "Email został wysłany!",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isFormSend: false,
          validateMessage: "Coś poszło nie tak...",
        });
      });
  };
  render() {
    const { checked, email, validateMessage, isFormSend } = this.state;
    return (
      <Zoom in={checked}>
        <OuterGrid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="change-password"
        >
          <Form
            component="form"
            className="change-password-form"
            onSubmit={this.handleSetUsersPassword}
          >
            <H2 component="h2" className="change-password-header">
              Wpisz swój adres email
            </H2>
            <InputBox className="input-box">
              <StyledTextField
                id="user-email"
                label="Email"
                variant="outlined"
                type="text"
                name="email"
                value={email}
                onChange={this.handleChangeInputField}
              />
              <P
                component="p"
                style={{ color: !isFormSend ? "#FF0000" : "#008000" }}
              >
                {validateMessage}
              </P>
            </InputBox>
            {isFormSend ? (
              <StyledButton variant="contained">
                <StyledLink component={Link} to="/">
                  Wróć do strony logowania
                </StyledLink>
              </StyledButton>
            ) : (
              <StyledButton variant="contained" type="submit">
                Zmień hasło
              </StyledButton>
            )}
          </Form>
        </OuterGrid>
      </Zoom>
    );
  }
}

export default ChangePassword;
