import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBZMZvIdO5QTfbHDzLt__9X_Zbpu-BmuAc",
  authDomain: "kana-app-bf7bf.firebaseapp.com",
  databaseURL: "https://kana-app-bf7bf.firebaseio.com",
  projectId: "kana-app-bf7bf",
  storageBucket: "kana-app-bf7bf.appspot.com",
  messagingSenderId: "792776494084",
  appId: "1:792776494084:web:dccc634784ed0cec04f951",
  measurementId: "G-G3JP2GQ3PM"
};
// Initialize Firebase
// firebase.analytics();
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
