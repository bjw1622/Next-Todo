import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
const firebaseConfig = {
  apiKey: "AIzaSyBc6sMf-h5sd8N9TuF_2M3s8xOhLPtof4w",
  authDomain: "nextauth-pratice.firebaseapp.com",
  // databaseURL: "https://test.firebaseio.com",
  projectId: "nextauth-pratice",
  storageBucket: "nextauth-pratice.appspot.com",
  messagingSenderId: "313275721428",
  appId: "1:313275721428:web:473155ed281474553bbd41",
};

const fbase = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
export const fbAuth = getAuth(fbase);
