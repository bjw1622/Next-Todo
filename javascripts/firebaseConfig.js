// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7rk5lIdaX8w72L8SZ-VZGqRCs9eoHHf0",
  authDomain: "auth-371101.firebaseapp.com",
  projectId: "auth-371101",
  storageBucket: "auth-371101.appspot.com",
  messagingSenderId: "594563818419",
  appId: "1:594563818419:web:eb1b2a7080d6ebf7aa21c6",
};

// Initialize Firebase
export const fbApp = initializeApp(firebaseConfig);
export const fbAuth = getAuth(fbApp);
