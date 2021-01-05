import { db, fire } from "../../Firebase/firebase";
export const LOGIN_SUCCESS = "LOGIN_SUCCES";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCES";
// export const REGISTER = "REGISTER";
export const CHOOSE_WRONG_ANSWERS = "CHOOSE_WRONG_ANSWERS";
export const GET_SYLLABARY = "GET_SYLLABARY";
export const RESTART_CHOICE = "RESTART_CHOICE";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const SET_USER = "SET_USER";
export const EMAIL_VALIDATION = "EMAIL_VALIDATION";

export const emailValidation = () => {
  return {
    type: EMAIL_VALIDATION,
  };
};

export const chooseWrongAnswers = (isUserChooseIncorrectAnswers) => {
  return {
    type: CHOOSE_WRONG_ANSWERS,
    isUserChooseIncorrectAnswers,
  };
};

export const getSyllabary = (syllabaryFromDatabase) => {
  return {
    type: GET_SYLLABARY,
    syllabaryFromDatabase,
  };
};

export const restartUserChoice = () => {
  return {
    type: RESTART_CHOICE,
  };
};

export const loginUser = (email, password) => () =>
  fire.auth().signInWithEmailAndPassword(email, password);

export const logoutUser = () => () => fire.auth().signOut();

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

const noop = () => {};

export const subscribeToAuthChange = () => (dispatch) => {
  let unsubscribeUser = noop;

  fire.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // user
      const handleUser = (snapshot) => {
        const user = snapshot.val();
        dispatch(setUser(user));
      };

      const userRef = fire.database().ref("users").child(user.uid);
      userRef.on("value", handleUser);
      unsubscribeUser = () => {
        userRef.off("value", handleUser);
      };
    } else {
      unsubscribeUser();
      dispatch(setUser(null));
    }
  });
};
