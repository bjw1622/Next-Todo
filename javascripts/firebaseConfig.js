// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc6sMf-h5sd8N9TuF_2M3s8xOhLPtof4w",
  authDomain: "nextauth-pratice.firebaseapp.com",
  projectId: "nextauth-pratice",
  storageBucket: "nextauth-pratice.appspot.com",
  messagingSenderId: "313275721428",
  appId: "1:313275721428:web:473155ed281474553bbd41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const fbApp = initializeApp(firebaseConfig);
export const fbAuth = getAuth(fbApp);
