import React, { Component } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

import firebase from "firebase";

const OuterGrid = styled(Grid)({
  background: "rgb(255,255,255)",
  height: "80%",
  marginTop: "8%",
  borderRadius: "35px",
  boxShadow: "0 8px 12px rgba(0,0,0,0.18)",
  padding: "30px 30px"
});

const StyledInput = styled(Input)({
  display: "none"
});

const getExtension = name => {
  const lastDot = name.lastIndexOf(".");
  return name.substring(lastDot + 1);
};

const noop = () => {};

class MyProfile extends Component {
  state = {
    image: null,
    user: null,
    imageUrl: null
  };

  handleSelectImage = event => {
    const image = event.target.files[0];
    const uid = this.state.user.uid;

    if (!image) {
      return;
    }

    const ext = getExtension(image.name);

    this.setState({
      image
    });

    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`avatars/${uid}.${ext}`);

    const uploadTask = imageRef.put(image);
    console.log("uploading file...");
    uploadTask.then(snapshot => {
      console.log("...file uploaded.", snapshot.ref);
      snapshot.ref.getDownloadURL().then(url => {
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
    const handleAuthChange = user => {
      console.log(user);
      if (user) {
        const { uid, email } = user;
        console.log(uid, email);

        this.unsubscribeFromUserProfile = firebase
          .database()
          .ref("users")
          .child(uid)
          .on("value", snapshot => {
            this.setState({
              user: snapshot.val()
            });
          });

        // TODO remove this call once the signup process is fixed
        firebase
          .database()
          .ref("users")
          .child(uid)
          .update({ uid, email });
      } else {
        if (this.unsubscribeFromUserProfile) {
          this.unsubscribeFromUserProfile();
        }
        this.setState({
          user: null
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
    const { user } = this.state;

    return (
      <OuterGrid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        <section className="my-profile">
          <main className="my-profile__container">
            <div className="my-profile__avatar-box">
              <Avatar src={user?.avatarUrl} />
              <StyledInput
                type="file"
                accept="image/*"
                id="upload-image"
                multiple={false}
                onChange={this.handleSelectImage}
              />
              <label htmlFor="upload-image">
                <Button variant="contained" component="span">
                  Zmień avatar
                </Button>
              </label>
            </div>
            <Button variant="contained" component={Link} to="/home">
              Powrót
            </Button>
          </main>
        </section>
      </OuterGrid>
    );
  }
}

export default MyProfile
