import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";
import { uploadProfileImage } from "../Redux/actions/auth";

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
    image: null,
    imagePreviewUrl: ""
  };

  handleSelectImage = e => {
    let reader = new FileReader();
    let images = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        image: images,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(images);
    this.props.uploadFile(this.state.imagePreviewUrl);
  };

  render() {
    const { isAuthenticated } = this.props;
    const { imagePreviewUrl } = this.state;
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
                <Avatar src={imagePreviewUrl} />
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
    image: state.auth.image
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadFile: image => {
      dispatch(uploadProfileImage(image));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
