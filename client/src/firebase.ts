import firebase from 'firebase/app';
import 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRsfgoBScLHuvgIY__a921_gGOnUaVBrY",
  authDomain: "spotify-music-quiz-ebb89.firebaseapp.com",
  projectId: "spotify-music-quiz-ebb89",
  storageBucket: "spotify-music-quiz-ebb89.appspot.com",
  messagingSenderId: "948402608046",
  appId: "1:948402608046:web:1008f56fa069969ac81a3f",
  measurementId: "G-Y2D4ESV0D8"
};

firebase.initializeApp(firebaseConfig);

export default firebase;