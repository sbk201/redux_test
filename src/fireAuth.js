import React from "react";
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "firebase/firestore";
import "firebase/auth";
const config = {
    apiKey: "AIzaSyDfyjrFzDcgKr2ObU_q--O0eNy-vt-6b9s",
    authDomain: "cloud-ab742.firebaseapp.com",
    databaseURL: "https://cloud-ab742.firebaseio.com",
    projectId: "cloud-ab742",
    storageBucket: "cloud-ab742.appspot.com",
    messagingSenderId: "724326141542"
};
firebase.initializeApp(config);

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};
export const FirebaseUI=()=> <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> ;

export default firebase