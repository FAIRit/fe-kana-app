import { db, fire } from "../../Firebase/firebase";

export const LOGIN_SUCCESS = "LOGIN_SUCCES";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCES";
export const REGISTER = "REGISTER";
export const IS_WRONG_HIRAGANA = "IS_WRONG_HIRAGANA";
export const IS_WRONG_KATAKANA = "IS_WRONG_KATAKANA";

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

export const registerUser = (email, password, login) => dispatch => {
  db.ref("Users/")
    .once("value")
    .then(snapshot => {
      const isUserExists = snapshot.child(`${login}`).exists();
      if (isUserExists) {
        console.log("użytkownik istnieje w bazie");
      } else {
        fire
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            dispatch(register(login));
          })
          .catch(error => {
            console.log(error);
          });
        db.ref("Users/" + login).set({
          username: login,
          email: email,
          password: password
        });
      }
    });
};

export const loginUser = (email, password, login) => dispatch => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(correctLogin(login));
    })
    .then(() => {
      const hiraganaRef = db.ref("hiraganaIncorrectAnswers/");
      const katakanaRef = db.ref("katakanaIncorrectAnswers/");
      hiraganaRef.once("value").then(snapshot => {
        const isUserHasWrongHiraganaAnswers = snapshot
          .child(`${login}`)
          .exists();
        dispatch(hiraganaWrongAnswers(isUserHasWrongHiraganaAnswers));
      });
      katakanaRef.once("value").then(snapshot => {
        const isUserHasWrongKatakanaAnswers = snapshot
          .child(`${login}`)
          .exists();

        dispatch(katakanaWrongAnswers(isUserHasWrongKatakanaAnswers));
      });
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

export * from "./auth";
