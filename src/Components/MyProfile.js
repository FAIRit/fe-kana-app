import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";
import { keepDataInLocalStorage } from "../Redux/actions/auth";
import { storage } from "../Firebase/firebase";

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

class MyProfile extends Component {
  state = {
    imageUrl: this.props.imageUrl ? this.props.imageUrl : "",
    imageName: this.props.imageName ? this.props.imageName : ""
  };

  handleSelectImage = e => {
    let images = e.target.files[0];
    this.setState({
      imageName: e.target.files[0].name
    });
    //set image to storage
    let storageRef = storage.ref();
    let imageRef = storageRef.child(`images/${this.props.user}/${images.name}`);
    imageRef.put(images).then(snapshot => {
      console.log("yay", snapshot);
    });
    //download via url
    storageRef
      .child(`images/${this.props.user}/${images.name}`)
      .getDownloadURL()
      .then(url => {
        this.setState({
          imageUrl: url
        });
        this.props.uploadImageUrl(url, this.state.imageName);
      });
  };

  // componentDidMount = () => {
  //   const imageUrl = localStorage.getItem("avatarImage");
  //   this.setState({
  //     imageUrl: imageUrl
  //   });
  // };

  render() {
    const { isAuthenticated } = this.props;
    const { imageUrl } = this.state;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
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
                <Avatar src={imageUrl} />
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
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    imageUrl: state.auth.imageUrl,
    imageName: state.auth.imageName,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImageUrl: (imageUrl, imageName) => {
      dispatch(keepDataInLocalStorage(imageUrl, imageName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
