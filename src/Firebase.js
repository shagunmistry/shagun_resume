import firebase from 'firebase';

// DO NOT FORGET -- Change your Firbase rules to only allow authenticated write requests to your DB.
// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
};
var firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export default firebaseApp;