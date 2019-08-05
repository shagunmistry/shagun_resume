import firebase from 'firebase';

// DO NOT FORGET -- Change your Firbase rules to only allow authenticated write requests to your DB.
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC_KKzYehksT1tdnSnreLHkgyKTU_ykL88",
  authDomain: "shagunresume.firebaseapp.com",
  databaseURL: "https://shagunresume.firebaseio.com",
  projectId: "shagunresume",
  storageBucket: "",
  messagingSenderId: "702206149527",
};
var firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export default firebaseApp;