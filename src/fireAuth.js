import React from "react";
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebaseui from 'firebaseui'
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
  credentialHelper:firebaseui.auth.CredentialHelper.NONE,
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: false,
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: { signInSuccessWithAuthResult :()=>window.location.reload()}
};
export const signOut=(checkUser)=> firebase.auth().signOut().then(checkUser());
export const FirebaseUI=()=> <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>;

export default firebase