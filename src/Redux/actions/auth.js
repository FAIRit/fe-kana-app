import { db, fire } from "../../Firebase/firebase";

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

export const registerUser = (email, password, login) => dispatch => {
  const value = db
    .ref("Users/")
    .once("value")
    .then(snapshot => {
      return snapshot.val();
    });
  const userLogin = value.then(snaps => {
    console.log(snaps[`${login}`].username);
    return snaps[`${login}`].username;
  });

  console.log(login, "login");
  console.log(userLogin, "userLogin");
  if (login === userLogin) {
    console.log("użytkownik istnieje w bazie");
  } else {
    db.ref("Users/" + login).set({
      username: login,
      email: email,
      password: password
    });
  }
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(register(login));
    })
    .catch(error => {
      console.log(error);
    });
};

export const loginUser = (email, password, login) => dispatch => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch(correctLogin(login));
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
