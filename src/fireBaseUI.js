import React from "react";
import firebase from "./fireBase.js"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebaseui from 'firebaseui'
import "firebase/auth";

const uiConfig= {
  signInFlow: 'popup',
  credentialHelper:firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: { signInSuccessWithAuthResult :()=>false}
};
export const authSignOut=(fn)=> firebase.auth().signOut().then(fn());
export const FirebaseUI=()=> <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>;