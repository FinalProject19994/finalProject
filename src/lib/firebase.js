// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb0LXRDWTOP3PwDwvWkTUE5Czz7c4ubS4",
  authDomain: "softskillshub-3cc83.firebaseapp.com",
  projectId: "softskillshub-3cc83",
  storageBucket: "softskillshub-3cc83.appspot.com",
  messagingSenderId: "31907126080",
  appId: "1:31907126080:web:d24683d8c0bdbca3dcf8a5",
  measurementId: "G-F9R4SWE3CX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
