import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc6sMf-h5sd8N9TuF_2M3s8xOhLPtof4w",
  authDomain: "nextauth-pratice.firebaseapp.com",
  databaseURL: "https://nextauth-pratice-default-rtdb.firebaseio.com",
  projectId: "nextauth-pratice",
  storageBucket: "nextauth-pratice.appspot.com",
  messagingSenderId: "313275721428",
  appId: "1:313275721428:web:473155ed281474553bbd41",
};

const app = initializeApp(firebaseConfig);
export const firebaseApp = app;
export const fbAuth = getAuth(app);
export const db = getFirestore(app);
