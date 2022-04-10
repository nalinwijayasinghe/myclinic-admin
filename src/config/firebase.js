import firebase from "firebase/app";
import "firebase/auth";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBksQnhuQESPyrF7_QdSc5AcKyINT9vx20",
  authDomain: "myclinicsl.firebaseapp.com",
  projectId: "myclinicsl",
  storageBucket: "myclinicsl.appspot.com",
  messagingSenderId: "253089229142",
  appId: "1:253089229142:web:7eff2968f2b490666fcef7",
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
