import fire from "../../Firebase/firebase";
import "firebase/firestore";
import firebase from "firebase/app";

export const LOGIN_SUCCESS = "LOGIN_SUCCES";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCES";
export const REGISTER = "REGISTER";

const register = user => {
  return {
    type: REGISTER,
    user
  };
};

const correctLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const registerUser = (email, password) => dispatch => {
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(register(user));
    })
    .catch(error => {
      console.log(error);
      const db = firebase.firestore();
      db.collection("users")
        .where("email", "==", "")
        .get()
        .then(response => {
          response.forEach(resp => {
            resp.ref.delete();
          });
        });
    });
};

export const loginUser = (email, password) => dispatch => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(correctLogin(user));
    })
    .catch(error => {
      console.log(error);
    });
};

export const logoutUser = () => dispatch => {
  fire
    .auth()
    .signOut()
    .then(() => {
      dispatch(logout());
    })
    .catch(error => {
      console.log(error);
    });
};
