import { db, fire } from "../../Firebase/firebase";

export const LOGIN_SUCCESS = "LOGIN_SUCCES";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCES";
export const REGISTER = "REGISTER";
export const IS_WRONG_HIRAGANA = "IS_WRONG_HIRAGANA";
export const IS_WRONG_KATAKANA = "IS_WRONG_KATAKANA";
export const CHOOSE_WRONG_ANSWERS = "CHOOSE_WRONG_ANSWERS";
export const GET_SYLLABARY = "GET_SYLLABARY";
export const RESTART_CHOICE = "RESTART_CHOICE";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const SET_USER = "SET_USER";

const hiraganaWrongAnswers = isUserHasWrongHiraganaAnswers => {
  return {
    type: IS_WRONG_HIRAGANA,
    isUserHasWrongHiraganaAnswers
  };
};

const katakanaWrongAnswers = isUserHasWrongKatakanaAnswers => {
  return {
    type: IS_WRONG_KATAKANA,
    isUserHasWrongKatakanaAnswers
  };
};

export const chooseWrongAnswers = () => {
  return {
    type: CHOOSE_WRONG_ANSWERS
  };
};


export const getSyllabary = syllabaryFromDatabase => {
  return {
    type: GET_SYLLABARY,
    syllabaryFromDatabase
  };
};

export const restartUserChoice = () => {
  return {
    type: RESTART_CHOICE
  };
};

export const registerUser = (email, password, username) => () => {
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      db.ref("users")
        .child(user.uid)
        .set({
          username,
          uid: user.uid,
          email: user.email
        });
    });
};

export const loginUser = (email, password) => () =>
  fire.auth().signInWithEmailAndPassword(email, password);

export const logoutUser = () => () => fire.auth().signOut();

export const setUser = user => ({
  type: SET_USER,
  user
});

const noop = () => {};

export const subscribeToAuthChange = () => dispatch => {
  let unsubscribeHiragana = noop;
  let unsubscribeKatakana = noop;
  let unsubscribeUser = noop;

  fire.auth().onAuthStateChanged(user => {
    if (user !== null) {
      // hiragana
      {
        const handleHiragana = snapshot => {
          const answers = snapshot.exists();
          dispatch(hiraganaWrongAnswers(answers))
          console.log("hiragana", answers);
        };

        const hiraganaRef = fire
          .database()
          .ref("hiraganaIncorrectAnswers")
          .child(user.uid);

        hiraganaRef.on("value", handleHiragana);

        unsubscribeHiragana = () => {
          hiraganaRef.off("value", handleHiragana);
        };
      }

      // katakana
      {
        const handleKatakana = snapshot => {
          const answers = snapshot.exists();
          dispatch(katakanaWrongAnswers(answers))
          console.log("katakana", answers);
        };

        const katakanaRef = fire
          .database()
          .ref("katakanaIncorrectAnswers")
          .child(user.uid);

        katakanaRef.on("value", handleKatakana);

        unsubscribeKatakana = () => {
          katakanaRef.off("value", handleKatakana);
        };
      }

      // user
      {
        const handleUser = snapshot => {
          const user = snapshot.val();
          dispatch(setUser(user));
        };

        const userRef = fire
          .database()
          .ref("users")
          .child(user.uid);

        userRef.on("value", handleUser);

        unsubscribeUser = () => {
          userRef.off("value", handleUser);
        };
      }
    } else {
      unsubscribeHiragana();
      unsubscribeKatakana();
      unsubscribeUser();
      dispatch(setUser(null));
    }
  });
};
