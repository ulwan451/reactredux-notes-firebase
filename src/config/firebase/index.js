import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVGGQ_aF7SC7I9L3dbB3Hcen9PQxWUZlU",
  authDomain: "simples-notes-firebase.firebaseapp.com",
  databaseURL: "https://simples-notes-firebase.firebaseio.com",
  projectId: "simples-notes-firebase",
  storageBucket: "simples-notes-firebase.appspot.com",
  messagingSenderId: "28684719443",
  appId: "1:28684719443:web:1923c3c7f5822ce1ecbda6",
  measurementId: "G-3NRPM14WXV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
