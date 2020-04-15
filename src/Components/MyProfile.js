import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
import firebase from "firebase";

const OuterGrid = styled(Grid)({
  width: "100%",
  background: "rgb(255,255,255)",
  height: "80%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
  padding: "30px 30px",
});
const StyledAvatar = styled(Avatar)({
  width: "13rem",
  height: "13rem",
  margin: "15px 0",
});

const Div = styled(Box)({
  textAlign: "center",
});
const SectionGrid = styled(Grid)({
  height: "100%",
});
const DivBox = styled(Box)({
  width: "50%",
});
const DivContainer = styled(Grid)({
  width: "60%",
  marginBottom: "15px",
});
const PBox = styled(Box)({
  textAlign: "center",
  fontWeight: "600",
});
const StyledButton = styled(Button)({
  background: "rgb(0, 43, 78)",
  color: "#fff",
});
const StyledLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
});

const getExtension = (name) => {
  const lastDot = name.lastIndexOf(".");
  return name.substring(lastDot + 1);
};

const noop = () => {};

class MyProfile extends Component {
  state = {
    image: null,
    user: null,
    checked: true,
  };

  //choosing avatar image
  handleSelectImage = (event) => {
    const image = event.target.files[0];
    const uid = this.state.user.uid;

    //if user doesn't choose image
    if (!image) {
      return;
    }

    const ext = getExtension(image.name);
    this.setState({
      image,
    });

    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`avatars/${uid}.${ext}`);
    const uploadTask = imageRef.put(image);
    console.log("uploading file...");
    uploadTask.then((snapshot) => {
      console.log("...file uploaded.", snapshot.ref);
      snapshot.ref.getDownloadURL().then((url) => {
        firebase
          .database()
          .ref("users")
          .child(uid)
          .child("avatarUrl")
          .set(url)
          .then(() => {
            console.log("user profile updated");
          });
      });
    });
  };

  unsubscribeFromAuth = noop;
  unsubscribeFromUserProfile = noop;

  componentDidMount() {
    const handleAuthChange = (user) => {
      if (user) {
        const { uid } = user;
        this.unsubscribeFromUserProfile = firebase
          .database()
          .ref("users")
          .child(uid)
          .on("value", (snapshot) => {
            this.setState({
              user: snapshot.val(),
            });
          });
      } else {
        if (this.unsubscribeFromUserProfile) {
          this.unsubscribeFromUserProfile();
        }
        this.setState({
          user: null,
        });
      }
    };
    this.unsubscribeFromAuth = firebase
      .auth()
      .onAuthStateChanged(handleAuthChange);
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { user, checked } = this.state;

    return (
      <Zoom in={checked}>
        <OuterGrid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          className="my-profile"
        >
          <SectionGrid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
          >
            <Div className="my-profile-avatar-box">
              <StyledAvatar src={user?.avatarUrl} />

              <input
                accept="image/*"
                id="upload-image"
                multiple={false}
                onChange={this.handleSelectImage}
                className="input-btn"
                type="file"
                style={{ display: "none" }}
              />

              <Button
                variant="contained"
                component="label"
                htmlFor="upload-image"
                style={{ background: "rgb(0, 43, 78)", color: "#fff" }}
              >
                Zmień avatar
              </Button>
            </Div>
            <h2 className="my-profile-header">Dane użytkownika</h2>
            <DivContainer
              container
              direction="row"
              alignItems="center"
              className="my-profile-box"
            >
              <DivBox className="my-profile-data">
                <PBox component="p">Nazwa użytkownika</PBox>
                <PBox component="p">Adres email</PBox>
              </DivBox>
              <DivBox className="my-profile-data">
                <PBox component="p">{user?.username}</PBox>
                <PBox component="p">{user?.email}</PBox>
              </DivBox>
            </DivContainer>
            <StyledButton variant="contained">
              <StyledLink to="/home" component={Link}>
                Powrót
              </StyledLink>
            </StyledButton>
          </SectionGrid>
        </OuterGrid>
      </Zoom>
    );
  }
}

export default MyProfile;
